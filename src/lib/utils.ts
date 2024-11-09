import { GetListProps } from '@/types';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import api from './api';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function handleDeleteSelected<TData>(selectedRows: TData[]) {
  // Implement your delete logic here
  console.log('Deleting:', selectedRows);
}

export async function fetchListData(url: string, params?: Partial<GetListProps>) {
  const res = await api.post(url, {
    pageIndex: params?.pageIndex || 1,
    pageSize: params?.pageSize || 10,
    search: params?.search || '',
    sortBy: params?.sortBy || [],
  });

  return res.data.data;
}

export async function fetchData(url: string) {
  const res = await api.get(url);
  return res.data;
}

export async function mutateData<T>(
  url: string,
  data: T,
  method: 'post' | 'put' | 'delete' = 'post'
) {
  switch (method) {
    case 'delete':
      return (await api.delete(url)).data;
    case 'put':
      return (await api.put(url, data)).data;
    case 'post':
      return (await api.post(url, data)).data;
    default:
      break;
  }
}
