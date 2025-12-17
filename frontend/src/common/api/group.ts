import client from './client';
import { TodoGroup, TodoGroupDetail } from '../types';

export const getGroups = async (): Promise<TodoGroup[]> => {
  const res = await client.get<TodoGroup[]>('/groups/');
  return res.data;
}

export const getGroup  = async (id: number): Promise<TodoGroupDetail> => {
  const res = await client.get<TodoGroupDetail>(`/groups/${id}/`);
  return res.data;
}

export const createGroup = async (name: string): Promise<TodoGroup> => {
  const res = await client.post<TodoGroup>('/groups/', { name });
  return res.data;
}

export const deleteGroup = async (id: number): Promise<void> => {
  await client.delete(`/groups/${id}/`);
}

export const updateGroup = async (id: number, name: string): Promise<TodoGroup> => {
  const res = await client.patch<TodoGroup>(`/groups/${id}/`, { name });
  return res.data;
}
