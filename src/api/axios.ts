import axios from 'axios';
import { Domain } from './endpoints';

const api = axios.create({
  baseURL: Domain.DOMAIN,
  withCredentials: true,
  timeout: 10000,
});

export const setupAxiosInterceptors = (
  getAccessToken: () => string | null,
  refreshToken: () => Promise<boolean>,
  logout: () => void,
) => {
  api.interceptors.request.use(
    config => {
      const token = getAccessToken();
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    error => Promise.reject(error),
  );

  api.interceptors.response.use(
    response => response,
    async error => {
      const originalRequest = error.config;
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        const isRefreshSuccessful = await refreshToken();
        if (isRefreshSuccessful) {
          return api(originalRequest);
        } else {
          logout();
          return Promise.reject(error);
        }
      }
      return Promise.reject(error);
    },
  );
};

export default api;
