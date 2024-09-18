import axios, { AxiosError } from 'axios';
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
  async (error: AxiosError<any>) => {
    // TODO: interceptor setting
    console.log(error);
    const response = error.response;
    if (response?.status === 401) {
      // console.log('토큰 재요청 로직');
      const originalConfig = error.config;
    }
    if (response?.data?.code || response?.data?.statusCode) {
      const code: string = response.data.code || response.data.statusCode;
      const codeNum = parseInt(code.split('_')?.[0]);
      if (codeNum >= 200 || codeNum < 300)
        return await Promise.resolve({
          statusCode: codeNum,
          msg: response.data?.msg,
          data: null,
        });
    }
    return error;
  },
);

export default api;
