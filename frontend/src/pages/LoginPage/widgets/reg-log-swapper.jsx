import clsx from 'clsx';

function SwapperWidget({selected, setSelected}){

  return (
    <div className="grid grid-cols-2 gap-2 py-1 px-2 bg-b1 rounded-md">
      <div className={clsx("px-2 py-0.5 text-center cursor-pointer select-none rounded text-lg", selected && "bg-b0")} onClick={() => setSelected(true)}>Вход</div>
      <div className={clsx("px-2 py-0.5 text-center cursor-pointer select-none rounded text-lg", !selected && "bg-b0")} onClick={() => setSelected(false)}>Регистрация</div>
    </div>
  )
}

export default SwapperWidget;