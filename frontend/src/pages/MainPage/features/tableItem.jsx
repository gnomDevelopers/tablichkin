import IconTableEnter from '../../../assets/icons/icon_table_enter.svg';


function TableItem({title, lastChange, onClick}) {
  return (
    <article className='flex flex-row items-center gap-2 border-2 border-brd-dark rounded-md px-2 py-1' onClick={onClick} title={title}>
      <div className='flex flex-col grow cursor-pointer overflow-hidden'>
        <h3 className='text-lg font-medium select-none truncate'>{title}</h3>
        <span className='text-sm font-light select-none'>Послед. изм.: {lastChange}</span>
      </div>
      <div className='flex flex-col justify-center items-center shrink-0'>
        <img src={IconTableEnter} className='w-8 h-8 cursor-pointer'/>
      </div>
    </article>
  )
}


export default TableItem;