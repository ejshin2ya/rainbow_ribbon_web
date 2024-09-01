import axios from 'axios';
import { Domain } from './endpoints';

const api = axios.create({
  baseURL: Domain.DOMAIN,
  withCredentials: true,
  timeout: 10000,
});

// request 인터셉터
api.interceptors.request.use(
  config => {
    // TODO: interceptor setting
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

// response 인터셉터
api.interceptors.response.use(
  response => {
    console.log(response);
    return response;
  },
  error => {
    // TODO: interceptor setting
    console.log(error);
    const response = error.response;
    if (response.status === 401) {
      console.log('토큰 재요청 로직');
      const originalConfig = error.config;
    }
    return error;
  },
);

export default api;
