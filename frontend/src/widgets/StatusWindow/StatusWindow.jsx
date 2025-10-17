import { useState } from 'react';
import { useStatusWindowContext } from './StatusWindowProvider'; 

import IconClose from './icons/icon-close.svg';
import IconError from './icons/icon-error.svg';
import IconInfo from './icons/icon-info.svg';
import IconLoading from './icons/icon-loading.svg';
import IconSuccess from './icons/icon-success.svg';

const statusConfig = {
  success: {
    icon: IconSuccess,
    borderColor: 'border-green-400',
  },
  loading: {
    icon: IconLoading,
    borderColor: 'border-yellow-400',
  },
  error: {
    icon: IconError,
    borderColor: 'border-red-400',
  },
  info: {
    icon: IconInfo,
    borderColor: 'border-blue-400',
  },
};

const StatusNotification = ({ notification, onClose }) => {
  const config = statusConfig[notification.status];
  const iconSrc = config.icon;
  const [isClose, setIsClose] = useState(false);

  // Автоматическое 'нажатие' на кнопку закрыть чтобы была анимация
  notification.duration > 300 && setTimeout(() => {
    closeHandler();
  }, notification.duration - 300);

  const closeHandler = () => {
    setIsClose(true);

    setTimeout(() => {
      onClose(notification.id);
    }, 300);
  }

  return (
    <div className={`
      flex flex-row items-center gap-3 px-6 py-4 border-l-6 rounded-r-xl
      ${config.borderColor} ${isClose && 'animate-slide-out'} bg-status-window-bg 
      min-w-64 max-w-md animate-slide-in shrink-0
      `}>

      <img src={iconSrc} className='w-6 h-6 invert'/>

      <span className='select-none cursor-default'>{notification.message}</span>

      <button onClick={closeHandler} className="shrink-0 cursor-pointer ml-auto">
        <img src={IconClose} className="w-5 h-5 invert" />
      </button>

    </div>
  );
};

export const StatusContainer = () => {
  const { notifications, hideStatus } = useStatusWindowContext();

  if (notifications.length === 0) return null;

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
      <div className="flex flex-col items-center gap-2">
        {notifications.map((notification) => (
          <StatusNotification
            key={notification.id}
            notification={notification}
            onClose={hideStatus}
          />
        ))}
      </div>
    </div>
  );
};