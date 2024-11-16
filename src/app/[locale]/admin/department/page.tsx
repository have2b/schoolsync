'use client';

import { DataTable } from '@/components';
import { useCrud } from '@/hooks';
import { departmentColumn } from '@/types';

const AdminDepartment = () => {
  const { useList } = useCrud({ modelName: 'department' });
  const { data, isLoading, error } = useList();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // Ensure data exists before attempting to access data.data
  const activeData = data?.data?.filter((item: { isActive: boolean }) => item.isActive) ?? [];

  return (
    <DataTable
      columns={departmentColumn}
      data={activeData ?? []}
      searchableColumns={['name', 'detail', 'code']}
      modelName="department"
    />
  );
};

export default AdminDepartment;
