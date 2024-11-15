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

  return (
    <DataTable
      columns={courseColumn}
      data={data.data ?? []}
      searchableColumns={['name', 'code']}
      modelName="course"
    />
  );
};

export default AdminCourse;
