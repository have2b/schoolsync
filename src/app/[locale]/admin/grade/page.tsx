'use client';

import { DataTable } from '@/components';
import { useCrud } from '@/hooks';
import { gradeColumn } from '@/types';

const AdminRoster = () => {
  const { useList } = useCrud({ modelName: 'roster' });
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
      columns={gradeColumn}
      data={activeData ?? []}
      searchableColumns={['code', 'name']}
      modelName="roster"
      showAddAndDelete={false}
      showImportExport={false}
    />
  );
};

export default AdminRoster;
