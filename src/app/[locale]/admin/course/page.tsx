'use client';

import { DataTable } from '@/components';
import { useCrud } from '@/hooks';
import { courseColumn } from '@/types';
import { Course } from '@prisma/client';
import { Row } from '@tanstack/react-table';
import { format } from 'date-fns';
import { useTranslations } from 'next-intl';
import * as XLSX from 'xlsx';

const AdminCourse = () => {
  const { useList } = useCrud({ modelName: 'course' });
  const { data, isLoading, error } = useList();

  const t = useTranslations();

  const exportToExcel = (rows: Row<Course>[]) => {
    const rowData = rows.map((row) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const item = row.original as Record<string, any>;
      // Create a new object with only the columns we want, with custom names
      return {
        [t('course.fields.code.label')]: item.code,
        [t('course.fields.name.label')]: item.name,
        [t('course.fields.credit.label')]: item.credit,
        [t('course.fields.lesson.label')]: item.lesson,
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
    XLSX.writeFile(workbook, `course-${date}.xlsx`);
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
      columns={courseColumn}
      data={activeData ?? []}
      searchableColumns={['name', 'code']}
      modelName="course"
      exportToExcel={exportToExcel}
    />
  );
};

export default AdminCourse;
