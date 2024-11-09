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

export async function fetchData(url: string, params?: Partial<GetListProps>) {
  const res = await api.post(url, {
    pageIndex: params?.pageIndex || 1,
    pageSize: params?.pageSize || 10,
    search: params?.search || '',
    sortBy: params?.sortBy || [],
  });

  return res.data.data;
}

export async function createData<T>(url: string, data: T) {
  const res = await api.post(url, data);
  return res.data.data;
}
