import client from './client';
import { Todo, TodoCreateRequest, TodoUpdateRequest, OverdueCountResponse } from '../types';

export const getTodos = async (sort?: string): Promise<Todo[]> => {
  const params = sort ? { sort } : {};
  const res = await client.get<Todo[]>('/todos/', { params });

  return res.data;
}

export const getTodo = async (id: number): Promise<Todo> => {
  const res = await client.get<Todo>(`/todos/${id}/`);
  return res.data;
}

export const createTodo = async (data: TodoCreateRequest): Promise<Todo> => {
  const res = await client.post<Todo>('/todos/', data);
  return res.data;
}

export const updateTodo = async (id: number, data: TodoUpdateRequest): Promise<Todo> => {
  const res = await client.patch<Todo>(`/todos/${id}/`, data);
  return res.data;
}

export const deleteTodo = async (id: number): Promise<void> => {
  await client.delete(`/todos/${id}/`);
}

export const getOverdueCount = async (): Promise<number> => {
  const res = await client.get<OverdueCountResponse>('/todos/overdue-count/');
  return res.data.overdue_count;
}
