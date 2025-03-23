import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const BASE_URL = "https://quiz-platform-backend-production.up.railway.app"

// Create axios instance with base configuration
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Add request interceptor to inject token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor to handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Reusable HTTP methods
export const axiosRequest = {
  get: <T>(url: string, params?: object, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => 
    api.get<T>(url, { ...config, params }),
  
  post: <T>(url: string, body?: object, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => 
    api.post<T>(url, body, config),
  
  put: <T>(url: string, body?: object, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => 
    api.put<T>(url, body, config),
  
  delete: <T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => 
    api.delete<T>(url, config)
};