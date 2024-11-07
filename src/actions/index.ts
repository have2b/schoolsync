import axios from '@/config/axiosConfig';

export function handleDeleteSelected<TData>(selectedRows: TData[]) {
  // Implement your delete logic here
  console.log('Deleting:', selectedRows);
}

export async function fetchTableData() {
  const res = await axios.post('/api/departments/get-department', {
    pageIndex: 0,
    pageSize: 10,
  });
  return res.data.data.data;
}
