import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

interface RetryableAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

interface ApiErrorResponse {
  detail?: string;
  message?: string;
  [key: string]: unknown;
}

interface RefreshResponse {
  access: string;
}

const client = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

client.interceptors.request.use((config: RetryableAxiosRequestConfig) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

client.interceptors.response.use((response) => response, async (error: AxiosError<ApiErrorResponse>) => {
  const originalRequest = error.config as RetryableAxiosRequestConfig | undefined;

  if (!originalRequest) {
    return Promise.reject(error);
  }

  if (error.response?.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;

    const refreshToken = localStorage.getItem('refresh_token');

    if (refreshToken) {
      try {
        const res = await axios.post<RefreshResponse>('http://localhost:8000/api/auth/refresh/', {
          refresh: refreshToken,
        });

        const newAccessToken = res.data.access;
        localStorage.setItem('access_token', newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return client(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/login';
      }
    }
  }

  return Promise.reject(error);
});

export default client;
