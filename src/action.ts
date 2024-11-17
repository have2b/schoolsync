'use server';

import { UpdateGradeReq } from '@/server/grade';
import { cookies } from 'next/headers';
import api from './lib/api';

export async function deleteSession() {
  return (await cookies()).delete('AUTH_SESSION_TOKEN');
}

export async function fetchListData(url: string) {
  const res = await api.get(url);

  return res.data.data;
}

export const updateGrades = async (grades: UpdateGradeReq[]) => {
  const { data } = await api.put('/grades/update', grades);
  return data;
};

export async function fetchData(url: string) {
  const res = await api.get(url);
  return res.data;
}

export async function mutateData<T>(url: string, data: T, method: 'post' | 'put' | 'delete') {
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
