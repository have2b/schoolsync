'use client';

import { DataTable } from '@/components';
import { useCrud } from '@/hooks';
import { GetListGroupRes } from '@/server/group';
import { groupColumn } from '@/types';
import { Row } from '@tanstack/react-table';
import { format } from 'date-fns';
import { useTranslations } from 'next-intl';
import * as XLSX from 'xlsx';

const AdminDepartment = () => {
  const { useList } = useCrud({ modelName: 'group' });
  const { data, isLoading, error } = useList();

  const t = useTranslations();

  const exportToExcel = (rows: Row<GetListGroupRes>[]) => {
    const rowData = rows.map((row) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const item = row.original as Record<string, any>;
      // Create a new object with only the columns we want, with custom names
      return {
        [t('group.fields.code.label')]: item.code,
        [t('group.fields.name.label')]: item.name,
        [t('group.fields.capacity.label')]: item.capacity,
        [t('group.fields.teacher.label')]: item.teacher.name,
        [t('group.fields.department.label')]: item.department.name,
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
    XLSX.writeFile(workbook, `group-${date}.xlsx`);
  };

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
      columns={groupColumn}
      data={activeData ?? []}
      searchableColumns={['code', 'name', 'teacher', 'department']}
      modelName="group"
      exportToExcel={exportToExcel}
    />
  );
};

export default AdminDepartment;
