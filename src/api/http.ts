import axios, {AxiosError} from 'axios';
import type {ApiError} from '../types/api';

const isDev = __DEV__;

export const http = axios.create({
  timeout: 15000,
});

http.interceptors.request.use((config) => {
  if (isDev) {
    const method = (config.method || 'GET').toUpperCase();
    console.log('[HTTP]', method, config.url);
    console.log('[HTTP] headers:', config.headers);
    console.log('[HTTP] data:', config.data);
  }
  return config;
});

http.interceptors.response.use(
  (res) => {
    if (isDev) {
      console.log('[HTTP]', res.status, res.config?.url);
      console.log('[HTTP] data:', res.data);
    }
    return res;
  },
  (error) => {
    if (isDev) {
      const e = error as AxiosError<any>;
      console.log('[HTTP] error status:', e.response?.status);
      console.log('[HTTP] error url:', e.config?.url);
      console.log('[HTTP] error data:', e.response?.data);
    }
    return Promise.reject(error);
  }
);

export function toApiError(err: unknown): ApiError {
  const e = err as AxiosError<any>;
  if (e?.response) {
    return {
      status: e.response.status,
      message: e.response.data?.message || e.message || 'Error HTTP',
      details: e.response.data,
    };
  }
  if (e?.request) {
    return {message: 'No hubo respuesta del servidor (timeout/red).', details: e.message};
  }
  return {message: (err as any)?.message || 'Error desconocido', details: err};
}
