import axios from 'axios';

const API_URL = process.env.API_URL || 'http://localhost:3001/api';
const SHOW_LOGS = process.env.SHOW_LOGS;

// Создаем экземпляр axios с базовой конфигурацией
export const apiClient = axios.create({
  baseURL: API_URL,
  withCredentials: true, // для http-only cookies
});

console.log(`API_URL: ${API_URL}`)
console.log(`SHOW_LOGS: ${SHOW_LOGS}`)

// Флаг для избежания множественных refresh запросов
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Interceptor для логирования запросов
apiClient.interceptors.request.use(
  (config) => {
    SHOW_LOGS && console.log('[REQUEST]:', {
      url: `${config.baseURL}${config.url}`,
      method: config.method?.toUpperCase(),
      headers: config.headers,
      data: config.data,
      params: config.params,
    });
    return config;
  },
  (error) => {
    SHOW_LOGS && console.error('[REQUEST ERROR]:', error);
    return Promise.reject(error);
  }
);

// Interceptor для обработки 403 ошибок
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 403 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(() => {
          return apiClient(originalRequest);
        }).catch(err => {
          return Promise.reject(err);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        await apiClient.post('/refresh');
        processQueue(null);
        return apiClient(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        // Можно добавить редирект на логин при ошибке refresh
        // window.location.href = '/login';
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;