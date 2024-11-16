'use client';

import { DataTable } from '@/components';
import { useCrud } from '@/hooks';
import { studentColumn } from '@/types';

const AdminStudent = () => {
  const { useList } = useCrud({ modelName: 'student' });
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
      columns={studentColumn}
      data={activeData}
      searchableColumns={['code', 'name', 'dob', 'group', 'department']}
      modelName="student"
    />
  );
};

export default AdminStudent;
