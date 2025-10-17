import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LoginPage from './pages/LoginPage/LoginPage';
import { StatusContainer } from './widgets/StatusWindow/StatusWindow';
import { StatusWindowProvider } from './widgets/StatusWindow/StatusWindowProvider';
import ProtectedRoute from './lib/protectedRoute';

function App() {
  return (
    <StatusWindowProvider>
      <StatusContainer></StatusContainer>
      <Router>
          <Routes>
            <Route path="/login" element={<LoginPage />}/>
          </Routes>
      </Router>
    </StatusWindowProvider>
  );
}

export default App;