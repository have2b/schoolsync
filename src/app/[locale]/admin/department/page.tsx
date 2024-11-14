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

  return (
    <DataTable
      columns={departmentColumn}
      data={data.data ?? []}
      searchableColumns={['name', 'detail', 'code']}
      modelName="department"
    />
  );
};

export default AdminDepartment;
