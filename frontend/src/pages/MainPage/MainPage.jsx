import TableItem from "./features/tableItem";


function MainPage() {
  return (
    <div className="flex flex-row items-stretch w-svw h-svh overflow-hidden">

      <section className="flex flex-col w-[400px] items-stretch shrink-0 bg-1">
        <div className='flex flex-col items-center py-4 shrink-0'>
          <h1 className='text-2xl font-medium select-none cursor-default'>Мои таблицы</h1>
        </div>
        <div className='flex flex-col gap-2 items-stretch grow px-2 scrollable'>
          <TableItem title="Бух. учет за 2024г" lastChange="12.02.2024" onClick={() => console.log('select')}/>
          <TableItem title="Бух. учет за 2025г" lastChange="13.02.2025" onClick={() => console.log('select')}/>
          <TableItem title="Бух. учет за 2026г" lastChange="14.02.2026" onClick={() => console.log('select')}/>
          <TableItem title="Бух. учет за 2024г" lastChange="12.02.2024" onClick={() => console.log('select')}/>
          <TableItem title="Бух. учет за 2025г" lastChange="13.02.2025" onClick={() => console.log('select')}/>
          <TableItem title="Бух. учет за 2026г" lastChange="14.02.2026" onClick={() => console.log('select')}/>
          <TableItem title="Бух. учет за 2024г" lastChange="12.02.2024" onClick={() => console.log('select')}/>
          <TableItem title="Бух. учет за 2025г" lastChange="13.02.2025" onClick={() => console.log('select')}/>
          <TableItem title="Бух. учет за 2026г" lastChange="14.02.2026" onClick={() => console.log('select')}/>
          <TableItem title="Бух. учет за 2024г" lastChange="12.02.2024" onClick={() => console.log('select')}/>
          <TableItem title="Бух. учет за 2025г" lastChange="13.02.2025" onClick={() => console.log('select')}/>
          <TableItem title="Бух. учет за 2026г" lastChange="14.02.2026" onClick={() => console.log('select')}/>
          <TableItem title="Бух. учет за 2024г" lastChange="12.02.2024" onClick={() => console.log('select')}/>
          <TableItem title="Бух. учет за 2025г" lastChange="13.02.2025" onClick={() => console.log('select')}/>
          <TableItem title="Бух. учет за 2026г" lastChange="14.02.2026" onClick={() => console.log('select')}/>
          <TableItem title="Бух. учет за 2024г" lastChange="12.02.2024" onClick={() => console.log('select')}/>
          <TableItem title="Бух. учет за 2025г" lastChange="13.02.2025" onClick={() => console.log('select')}/>
          <TableItem title="Бух. учет за 2026г" lastChange="14.02.2026" onClick={() => console.log('select')}/>
        </div>
      </section>
      <section className="">
        // Route
      </section>
    </div>
  )
}


export default MainPage;