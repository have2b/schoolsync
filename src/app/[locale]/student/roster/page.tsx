'use client';

import { fetchListData } from '@/action';
import { DataTable } from '@/components';
import { useAuth } from '@/store/auth';
import { rosterStudentColumn } from '@/types';
import { useQuery } from '@tanstack/react-query';

const AdminRoster = () => {
  const { account } = useAuth();
  const { data, isLoading, error } = useQuery({
    queryKey: ['roster', 'table'],
    queryFn: async () => await fetchListData(`rosters/${account?.id}/list-by-student`),
    placeholderData: true, // Show old data while fetching new data
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <DataTable
      columns={rosterStudentColumn}
      data={data ?? []}
      searchableColumns={[]}
      modelName="roster"
      showAddAndDelete={false}
      showImportExport={false}
    />
  );
};

export default AdminRoster;
