import MainPageHeader from "../widgets/mainPageHeader";
import { useNavigate } from "react-router-dom";

function SelectTablePage() {
  const navigate = useNavigate();

  const createTableHandle = () => {
    navigate('/main/table/create');
  }

  return (
    <section className="flex flex-col items-stretch grow overflow-hidden">

      <MainPageHeader />

      <main className="bg-b0 grow flex flex-col justify-center items-center rounded-tl-xl">

        <p className="text-xl select-none cursor-default">Выберите таблицу</p>
        <p className="text-sm select-none">или</p>
        <p className="text-lg select-none cursor-pointer text-text-link font-medium hover:underline" onClick={createTableHandle}>Создайте новую таблицу</p>

      </main>

    </section>
  )
}


export default SelectTablePage;