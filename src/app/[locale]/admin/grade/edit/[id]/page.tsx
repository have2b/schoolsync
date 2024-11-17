'use client';

import { GradeTable } from '@/components';
import { useCrud } from '@/hooks';
import { gradeItemColumn } from '@/types';
import { useParams } from 'next/navigation';

const AdminEditGrade = () => {
  const params = useParams();
  const id = (params.id as string) || '';
  const { useGet } = useCrud({ modelName: 'grade' });
  const { data: grade, isLoading, error } = useGet(id);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <GradeTable
      columns={gradeItemColumn}
      rosterName={grade?.name ?? ''}
      data={grade?.grades ?? []}
      searchableColumns={['studentCode', 'studentName']}
    />
  );
};

export default AdminEditGrade;
