import axios from 'axios';
import env from '../env';

export const api = axios.create({
  baseURL: env.VITE_API_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response?.status === 401) {
      window.location.href = '/auth/login';
      window.localStorage.removeItem('pm:user');
    }
    return Promise.reject(error);
  }
);
