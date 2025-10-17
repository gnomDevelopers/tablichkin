import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LoginPage from './pages/LoginPage/LoginPage';
import ProtectedRoute from './lib/protectedRoute';

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />}/>
        </Routes>
    </Router>
  );
}

export default App;