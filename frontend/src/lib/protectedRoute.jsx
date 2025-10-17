import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const isAuthenticated = true; // ваша логика авторизации
  
  return isAuthenticated ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;