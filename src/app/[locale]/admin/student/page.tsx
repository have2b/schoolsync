'use client';

import { DataTable } from '@/components';
import { useCrud } from '@/hooks';
import { GetListStudentRes } from '@/server/student';
import { studentColumn } from '@/types';
import { Row } from '@tanstack/react-table';
import { format } from 'date-fns';
import { useTranslations } from 'next-intl';
import * as XLSX from 'xlsx';

const AdminStudent = () => {
  const t = useTranslations();

  const exportToExcel = (rows: Row<GetListStudentRes>[]) => {
    const rowData = rows.map((row) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const item = row.original as Record<string, any>;
      // Create a new object with only the columns we want, with custom names
      return {
        [t('student.fields.code.label')]: item.code,
        [t('student.fields.name.label')]: item.name,
        [t('student.fields.email.label')]: item.account.email,
        [t('student.fields.gender.label')]: t('enum.gender.' + item.gender.toLowerCase()),
        [t('student.fields.dob.label')]: item.dob ? format(new Date(item.dob), 'dd/MM/yyyy') : '',
        [t('student.fields.group.label')]: item.group.name,
        [t('student.fields.department.label')]: item.group.department.name,
      };
    });
    const worksheet = XLSX.utils.json_to_sheet(rowData);

    // Optional: Adjust column widths
    const columnWidths = Object.keys(rowData[0] || {}).reduce(
      (acc, key) => {
        acc[key] = { wch: Math.max(key.length, 15) }; // minimum width of 15 characters
        return acc;
      },
      {} as { [key: string]: { wch: number } }
    );
    worksheet['!cols'] = Object.values(columnWidths);

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');

    // Generate filename with date
    const date = format(new Date(), 'yyyy-MM-dd');
    XLSX.writeFile(workbook, `student-${date}.xlsx`);
  };

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
      exportToExcel={exportToExcel}
    />
  );
};

export default AdminStudent;
