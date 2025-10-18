import { useUser } from "../../../context/UserContext";
import { useNavigate } from 'react-router-dom';
import { useLocation  } from "react-router-dom";

import Button from "../../../lib/customButton";
import IconLogout from "../../../assets/icons/icon_logout.svg";

function MainPageHeader() {
  const userContext = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  const logoutHandler = () => {
    userContext.logout();
    navigate('/login', { replace: true });
  }

  const createTableHandle = () => {
    navigate('/main/table/create');
  }

  return (
    <header className="flex flex-row gap-4 items-stretch w-full h-14 shrink-0">
      <div className="grow px-4 flex flex-col overflow-hidden">
        <div className="flex flex-col items-start justify-center h-full">
          {location.pathname !== '/main/table/create' && <Button text="Создать таблицу" onClick={createTableHandle} />}
        </div>
      </div>

      <div className="flex flex-row shrink-0 mr-10 items-center gap-4">
        <div className="cursor-pointer select-none">
          {userContext.user && (userContext.user.first_name + ' ' + userContext.user.second_name)}
        </div>

        <div className="flex flex-col justify-center items-center cursor-pointer" onClick={logoutHandler}>
          <img src={IconLogout} className="w-5 h-5"/>
        </div>
      </div>
    </header>
  );
}


export default MainPageHeader;