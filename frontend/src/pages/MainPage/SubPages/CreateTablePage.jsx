import MainPageHeader from "../widgets/mainPageHeader";

function CreateTablePage() {
  

  return (
    <section className="flex flex-col items-stretch grow overflow-hidden">

      <MainPageHeader />

      <main className="bg-b0 grow flex flex-col items-center rounded-tl-xl gap-10">

        <h2 className="text-xl select-none cursor-default mt-10">Создание таблицы</h2>

        <div className="flex flex-row gap-12">
          <div className="flex flex-col gap-4 items-center bg-b1 rounded-xl py-4 px-6 w-72 cursor-pointer select-none">
            <h3 className="text-lg font-medium">Вручную</h3>
            <p className="text-sm text-justify">Создайте таблицу через наш веб интерфейс с типизацией полей</p>
          </div>
          <div className="flex flex-col gap-4 items-center bg-b1 rounded-xl py-4 px-6 w-72 cursor-pointer select-none">
            <h3 className="text-lg font-medium">Импорт из Excel</h3>
            <p className="text-sm text-justify">Автоматическое создание таблиц на основе уже существующей таблицы в Excel (.xlsx, .csv)</p>
          </div>
        </div>

        <div>
          <h2 className="text-xl select-none cursor-default">Предпросмотр</h2>
        </div>

      </main>

    </section>
  )
}


export default CreateTablePage;