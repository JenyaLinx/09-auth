import axios from 'axios';

const api = axios.create({
  baseURL: 'https://notehub-api.goit.study',
  withCredentials: true,
});

export { api };

export type ApiError = {
  response?: {
    data?: {
      error?: string;
    };
  };
  message: string;
  status?: number;
};