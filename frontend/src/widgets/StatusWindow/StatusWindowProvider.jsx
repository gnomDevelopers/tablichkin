import { createContext, useContext } from 'react';
import { useStatusWindow } from './useStatusWindow';

const StatusWindowContext = createContext();

export const StatusWindowProvider = ({ children }) => {
  const statusWindow = useStatusWindow();

  return (
    <StatusWindowContext.Provider value={statusWindow}>
      {children}
    </StatusWindowContext.Provider>
  );
};

export const useStatusWindowContext = () => {
  const context = useContext(StatusWindowContext);
  if (!context) {
    throw new Error('useStatusWindowContext must be used within a StatusWindowProvider');
  }
  return context;
};