import client from './client';
import { User, LoginRequest, LoginResponse, RegisterRequest } from '../types';
import { data } from 'react-router-dom';

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  const res = await client.post<LoginResponse>('/auth/login/', data);
  return res.data;
}

export const register = async (data: RegisterRequest): Promise<void> => {
  await client.post('/auth/register/', data);
}

export const getMe = async (): Promise<User> => {
  const res = await client.get<User>('/auth/me/');
  return res.data;
}

export const deleteAccount = async (): Promise<void> => {
  await client.delete('/auth/me/');
}

export const refleshToken = async (refresh: string): Promise<string> => {
  const res = await client.post<{ access: string }>('/auth/refresh/', { refresh });
  return res.data.access;
}
