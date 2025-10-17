import { useState, useCallback, useRef } from 'react';

export const useStatusWindow = () => {
  const [notifications, setNotifications] = useState([]);
  const timeoutRefs = useRef(new Map()); // Храним таймеры по id

  const removeNotification = useCallback((id) => {
    // Очищаем таймер если есть
    const timeoutId = timeoutRefs.current.get(id);
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutRefs.current.delete(id);
    }

    // Удаляем уведомление
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  }, []);

  const showStatus = useCallback((status, message, duration = 2000) => {
    // Увеличиваем id
    const id = Date.now() + Math.round(Math.random() * 1000000 + 1); // Уникальный ID

    const newNotification = {
      id,
      status,
      message,
      duration,
    };

    // Добавляем новое уведомление
    setNotifications(prev => [...prev, newNotification]);

    // Автоматическое удаление через duration
    if (duration > 0){
      const timeoutId = setTimeout(() => {
        removeNotification(id);
      }, duration);

      timeoutRefs.current.set(id, timeoutId);
    }

    // Возвращаем ID для ручного управления
    return id;
  }, [removeNotification]);

  const hideStatus = useCallback((id) => {
    removeNotification(id);
  }, [removeNotification]);

  const hideAll = useCallback(() => {
    // Очищаем все таймеры
    timeoutRefs.current.forEach((timeoutId) => {
      clearTimeout(timeoutId);
    });
    timeoutRefs.current.clear();
    
    // Очищаем все уведомления
    setNotifications([]);
  }, []);

  const success = useCallback((msg, duration) => showStatus('success', msg, duration), [showStatus]);
  const loading = useCallback((msg, duration) => showStatus('loading', msg, duration), [showStatus]);
  const error = useCallback((msg, duration) => showStatus('error', msg, duration), [showStatus]);
  const info = useCallback((msg, duration) => showStatus('info', msg, duration), [showStatus]);

  return {
    notifications,
    showStatus,
    hideStatus,
    hideAll,
    success,
    loading,
    error,
    info,
  };
};