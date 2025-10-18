import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { StatusContainer } from './widgets/StatusWindow/StatusWindow';
import { StatusWindowProvider } from './widgets/StatusWindow/StatusWindowProvider';
import { UserProvider } from './context/UserContext';
import ProtectedRoute from './lib/protectedRoute';
import LoginPage from './pages/LoginPage/LoginPage';
import MainPage from './pages/MainPage/MainPage';
import SelectTablePage from './pages/MainPage/SubPages/SelectTablePage';
import CreateTablePage from './pages/MainPage/SubPages/CreateTablePage/CreateTablePage';

function App() {
  return (
    <UserProvider>
      <StatusWindowProvider>
        <StatusContainer></StatusContainer>
        <Router>
            <Routes>
              <Route path="/login" element={<LoginPage />}/>
              <Route path="/main" element={
                <ProtectedRoute>
                  <MainPage />
                </ProtectedRoute>
              }>

                {/* Вложенные маршруты */}
                <Route index element={<SelectTablePage />} />
                <Route path="table/create" element={<CreateTablePage />} />
                {/* <Route path="table/:tableID" element={<TableView />} /> */}
              </Route>
            </Routes>
        </Router>
      </StatusWindowProvider>
    </UserProvider>
  );
}

export default App;