import clsx from 'clsx';

function SwapperWidget({selected, setSelected}){

  return (
    <div className="flex flex-row gap-2 items-stretch py-1 px-2 bg-1 rounded-md">
      <div className={clsx("w-1/2 shrink-0 px-2 py-0.5 text-center cursor-pointer select-none rounded text-lg", selected && "bg-0")} onClick={() => setSelected(true)}>Вход</div>
      <div className={clsx("w-1/2 shrink-0 px-2 py-0.5 text-center cursor-pointer select-none rounded text-lg", !selected && "bg-0")} onClick={() => setSelected(false)}>Регистрация</div>
    </div>
  )
}

export default SwapperWidget;