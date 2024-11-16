'use client';

import { DataTable } from '@/components';
import { useCrud } from '@/hooks';
import { courseColumn } from '@/types';

const AdminCourse = () => {
  const { useList } = useCrud({ modelName: 'course' });
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
      columns={courseColumn}
      data={activeData ?? []}
      searchableColumns={['name', 'code']}
      modelName="course"
    />
  );
};

export default AdminCourse;
