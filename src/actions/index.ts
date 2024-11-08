import axios from '@/config/axiosConfig';
import { GetListProps } from '@/funcs/interfaces';

export function handleDeleteSelected<TData>(selectedRows: TData[]) {
  // Implement your delete logic here
  console.log('Deleting:', selectedRows);
}

export async function fetchData(url: string, params?: Partial<GetListProps>) {
  const res = await axios.post(url, {
    pageIndex: params?.pageIndex || 1,
    pageSize: params?.pageSize || 10,
  });
  return res.data.data;
}
