import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { StatusContainer } from './widgets/StatusWindow/StatusWindow';
import { StatusWindowProvider } from './widgets/StatusWindow/StatusWindowProvider';
import ProtectedRoute from './lib/protectedRoute';
import LoginPage from './pages/LoginPage/LoginPage';
import MainPage from './pages/MainPage/MainPage';

function App() {
  return (
    <StatusWindowProvider>
      <StatusContainer></StatusContainer>
      <Router>
          <Routes>
            <Route path="/login" element={<LoginPage />}/>
            <Route path="/main" element={
              <ProtectedRoute>
                <MainPage />
              </ProtectedRoute>
            }/>
          </Routes>
      </Router>
    </StatusWindowProvider>
  );
}

export default App;