'use client';

import { DataTable } from '@/components';
import { useCrud } from '@/hooks';
import { groupColumn } from '@/types';

const AdminDepartment = () => {
  const { useList } = useCrud({ modelName: 'group' });
  const { data, isLoading, error } = useList();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <DataTable
      columns={groupColumn}
      data={data.data ?? []}
      searchableColumns={['code', 'name', 'teacher', 'department']}
      modelName="group"
    />
  );
};

export default AdminDepartment;
