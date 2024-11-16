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
  // Ensure data exists before attempting to access data.data
  const activeData =
    data?.data?.filter((item: { account: { isActive: boolean } }) => item.account.isActive) ?? [];

  return (
    <DataTable
      columns={teacherColumn}
      data={activeData ?? []}
      searchableColumns={['code', 'name', 'degree', 'major']}
      modelName="teacher"
    />
  );
};

export default AdminDepartment;
