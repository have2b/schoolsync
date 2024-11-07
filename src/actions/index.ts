import axios from '@/config/axiosConfig';

export function handleDeleteSelected<TData>(selectedRows: TData[]) {
  // Implement your delete logic here
  console.log('Deleting:', selectedRows);
}

export async function fetchData(url: string) {
  const res = await axios.post(url, {
    pageIndex: 0,
    pageSize: 10,
  });
  return res.data.data.data;
}
