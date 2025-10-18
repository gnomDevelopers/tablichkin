import { useState } from 'react';
import IconClose from '../../../../../assets/icons/icon_close.svg';
import IconAdd from '../../../../../assets/icons/icon_add.svg';
import Button from '../../../../../lib/customButton';

// Компонент столбца
const ColumnCard = ({ column, onUpdate, onRemove, index }) => {
  const [newOption, setNewOption] = useState('');

  const addOption = () => {
    if (newOption.trim() && !column.options.includes(newOption.trim())) {
      onUpdate(index, {
        ...column,
        options: [...column.options, newOption.trim()]
      });
      setNewOption('');
    }
  };

  const removeOption = (optionIndex) => {
    onUpdate(index, {
      ...column,
      options: column.options.filter((_, i) => i !== optionIndex)
    });
  };

  return (
    <div className="border-2 border-brd rounded-lg p-4 w-64 flex-shrink-0 relative">
      
      <div onClick={() => onRemove(index)} className="absolute right-1 top-1 w-6 h-6 flex items-center justify-center cursor-pointer">
        <img src={IconClose}/>
      </div>

      <div className="mb-3">
        <label className="block text-sm font-medium mb-1">Название столбца</label>
        <input
          type="text"
          value={column.title}
          onChange={(e) => onUpdate(index, { ...column, title: e.target.value })}
          placeholder="Введите название"
          className="w-full border-2 border-brd rounded px-3 py-2 text-sm outline-none"
        />
      </div>

      <div className="mb-3">
        <label className="block text-sm font-medium mb-1">
          Тип данных
        </label>
        <select
          value={column.type}
          onChange={(e) => onUpdate(index, { ...column, type: e.target.value })}
          className="w-full border-2 border-brd rounded px-3 py-2 text-sm outline-none"
        >
          <option value="string">Текст</option>
          <option value="number">Число</option>
          <option value="date">Дата</option>
          <option value="select">Выбор из списка</option>
        </select>
      </div>

      {column.type === 'select' && (
        <div>
          <label className="block text-sm font-medium mb-2">
            Варианты выбора
          </label>
          
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={newOption}
              onChange={(e) => setNewOption(e.target.value)}
              placeholder="Новый вариант"
              className="flex-1 border-2 border-brd rounded px-3 py-1 text-sm outline-none"
              onKeyDown={(e) => e.key === 'Enter' && addOption()}
            />
            <div onClick={addOption} className='cursor-pointer shrink-0'>
              <img src={IconAdd} className='w-5 h-5'/>
            </div>
          </div>

          <div className="space-y-1 max-h-32 overflow-y-auto">
            {column.options.map((option, optionIndex) => (
              <div key={optionIndex} className="flex items-center justify-between bg-b1 px-2 py-1 rounded text-sm">
                <span>{option}</span>
                <div onClick={() => removeOption(optionIndex)} className="cursor-pointer">
                  <img src={IconClose} className='w-4 h-4'/>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Главный компонент конструктора
const TableConstructor = ({ onColumnsChange }) => {
  const [columns, setColumns] = useState([]);

  const addColumn = () => {
    const newColumn = {
      title: `Столбец ${columns.length + 1}`,
      type: 'string',
      options: []
    };
    const updatedColumns = [...columns, newColumn];
    setColumns(updatedColumns);
    onColumnsChange(updatedColumns);
  };

  const updateColumn = (index, updatedColumn) => {
    const updatedColumns = columns.map((col, i) => 
      i === index ? updatedColumn : col
    );
    setColumns(updatedColumns);
    onColumnsChange(updatedColumns);
  };

  const removeColumn = (index) => {
    const updatedColumns = columns.filter((_, i) => i !== index);
    setColumns(updatedColumns);
    onColumnsChange(updatedColumns);
  };

  return (
    <div className="w-full">

      <div className="flex gap-4 overflow-x-auto pb-4 mb-4 max-w-[1400px] items-stretch">
        {columns.map((column, index) => (
          <ColumnCard
            key={index}
            column={column}
            index={index}
            onUpdate={updateColumn}
            onRemove={removeColumn}
          />
        ))}
        
        <div className='flex flex-col justify-center items-center gap-2 shrink-0'>

          <Button onClick={addColumn} text="+ Добавить столбец"/>

          {columns.length > 0 && (
            <div className="text-sm text-gray-600">
              Создано столбцов: {columns.length}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default TableConstructor;