import MainPageHeader from "../../widgets/mainPageHeader";
import XLSX from "xlsx";
import { useState } from "react";
import ExcelTable from "../../../../lib/excelTable";
import Button from "../../../../lib/customButton";
import TableConstructor from "./widgets/tableConstructor";
import { useStatusWindowContext } from "../../../../widgets/StatusWindow/StatusWindowProvider";

function CreateTablePage() {
  const [createTableManualy, setCreateTableManualy] = useState(null);
  const [excelData, setExcelData] = useState([]);
  const [readyToCreate, setReadyToCreate] = useState(false);
  const sw = useStatusWindowContext();

  const loadExcelHandler = () => {
    setCreateTableManualy(false);

    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.xlsx, .xls, .csv';
    
    input.onchange = async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      
      try {
        const arrayBuffer = await file.arrayBuffer();
        const workbook = XLSX.read(arrayBuffer, { type: 'array' });
        
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        setExcelData(jsonData);
        setReadyToCreate(true);
      } catch (error) {
        console.error('Ошибка при чтении файла:', error);
      }
    };
    
    input.click();
  };

  const createManualyHandler = () => {
    // Устанавливаем ручной режим создания таблицы
    setCreateTableManualy(true);
    // Очищаем данные из загруженного ранее файла
    setExcelData([]);
  }


  const handleColumnsChange = (columns) => {
    // Проверяем корректность таблицы
    setReadyToCreate(validateTableStructure(columns));
  };

  const createTableHandler = () => {
    const swID = sw.loading('Создаем таблицу...', 0);

    // API
    setTimeout(() => {
      sw.hideStatus(swID);
    }, 3000);
  } 


  return (
    <section className="flex flex-col items-stretch grow overflow-hidden">

      <MainPageHeader />

      <main className="bg-b0 grow flex flex-col items-center rounded-tl-xl gap-4 overflow-hidden">

        <h2 className="text-xl select-none cursor-default mt-4">Создание таблицы</h2>

        <div className="flex flex-row gap-12">
          <div className="flex flex-col gap-4 items-center bg-b1 hover:bg-b1/70 active:bg-b1 rounded-xl py-4 px-6 w-72 cursor-pointer select-none" onClick={createManualyHandler}>
            <h3 className="text-lg font-medium">Вручную</h3>
            <p className="text-sm text-justify">Создайте таблицу через наш веб интерфейс с типизацией полей</p>
          </div>
          <div className="flex flex-col gap-4 items-center bg-b1 hover:bg-b1/70 active:bg-b1 rounded-xl py-4 px-6 w-72 cursor-pointer select-none" onClick={loadExcelHandler}>
            <h3 className="text-lg font-medium">Импорт из Excel</h3>
            <p className="text-sm text-justify">Автоматическое создание таблиц на основе уже существующей таблицы в Excel (.xlsx, .csv)</p>
          </div>
        </div>

        {/* Парсинг excel файла */}
        {!createTableManualy && excelData.length !== 0 && <div className="overflow-hidden flex flex-col gap-4 w-full items-center px-4">
          <h2 className="text-xl select-none cursor-default">Предпросмотр</h2>

          <div className="flex flex-col max-h-[500px] max-w-[1400px] overflow-hidden">
            <ExcelTable excelData={excelData}/>
          </div>
        </div>}

        {/* Ручное создание таблицы */}
        {createTableManualy && <div>
          <TableConstructor onColumnsChange={handleColumnsChange}/>
        </div>}

        {readyToCreate && <div>
          <Button text="Создать" onClick={createTableHandler}/>
        </div>}

      </main>

    </section>
  )
}


function validateTableStructure(columns) {
  // Проверяем что columns - массив и не пустой
  if (!Array.isArray(columns) || columns.length === 0) {
    return false;
  }

  // Проверяем каждый столбец
  for (const column of columns) {
    // Проверяем наличие обязательных полей
    if (!column || typeof column !== 'object') {
      return false;
    }

    // Проверяем название столбца
    if (!column.title || typeof column.title !== 'string' || column.title.trim() === '') {
      return false;
    }

    // Проверяем тип данных
    const validTypes = ['string', 'number', 'date', 'select'];
    if (!column.type || !validTypes.includes(column.type)) {
      return false;
    }

    // Проверяем options
    if (!Array.isArray(column.options)) {
      return false;
    }

    // Для типа select проверяем что options не пустой
    if (column.type === 'select' && column.options.length === 0) {
      return false;
    }

    // Дополнительная проверка: все options должны быть строками
    if (column.options.some(option => typeof option !== 'string')) {
      return false;
    }
  }

  return true;
}


export default CreateTablePage;