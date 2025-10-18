import { useState, useRef, useEffect } from "react";

function ExcelTable({ excelData }) {
  const [rowCount, setRowCount] = useState(20);

  const tableContainerRef = useRef(null);
  const observerRef = useRef(null);

  // Функция для загрузки следующих строк
  const loadMoreRows = useCallback(() => {
    if (rowCount < excelData.length - 1) {
      setRowCount(prev => Math.min(prev + 20, excelData.length - 1));
    }
  }, [rowCount, excelData.length]);

  // Наблюдатель за последним элементом
  const lastRowRef = useCallback((node) => {
    console.log('last row visible, loading more');

    if (observerRef.current) observerRef.current.disconnect();
    
    observerRef.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && rowCount < excelData.length - 1) {
        loadMoreRows();
      }
    });

    if (node) observerRef.current.observe(node);
  }, [rowCount, excelData.length, loadMoreRows]);

  // Сбрасываем счетчик при изменении данных
  useEffect(() => {
    setRowCount(20);
  }, [excelData]);

  // Очищаем observer при размонтировании
  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return (
    <div className="scrollable-x-y" ref={tableContainerRef}>
      <table className="border border-brd">

        <thead>
          <tr className="bg-gray-100">
            {excelData[0]?.map((item, index) => (
              <th key={index} className="border border-gray-300 px-4 py-2 text-left">
                {item || `Column ${index + 1}`}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {excelData.slice(1, rowCount).map((row, rowIndex) => (
            <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-gray-50' : 'bg-gray-100'} ref={(rowIndex === rowCount - 2) ? lastRowRef : null}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="border border-gray-300 px-4 py-2">
                  {cell?.toString() || ''}
                </td>
              ))}
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  )
}

export default ExcelTable;