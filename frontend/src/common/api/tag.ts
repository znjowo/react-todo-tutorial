import client from './client';
import { Tag } from '../types';

export const getTags = async (): Promise<Tag[]> => {
  const res = await client.get<Tag[]>('/tags/');
  return res.data;
}

export const getTag = async (id: number): Promise<Tag> => {
  const res = await client.get<Tag>(`/tags/${id}/`);
  return res.data;
}
