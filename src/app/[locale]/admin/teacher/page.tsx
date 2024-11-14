'use client';

import { DataTable } from '@/components';
import { useCrud } from '@/hooks';
import { teacherColumn } from '@/types';

const AdminDepartment = () => {
  const { useList } = useCrud({ modelName: 'teacher' });
  const { data, isLoading, error } = useList();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <DataTable
      columns={teacherColumn}
      data={data.data ?? []}
      searchableColumns={['code', 'name', 'degree', 'major']}
      modelName="teacher"
    />
  );
};

export default AdminDepartment;
