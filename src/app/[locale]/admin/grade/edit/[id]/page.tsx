'use client';

import { GradeTable } from '@/components';
import { useCrud } from '@/hooks';
import { GetGradeRes } from '@/server/grade';
import { gradeItemColumn } from '@/types';
import { Row } from '@tanstack/react-table';
import { format } from 'date-fns';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import * as XLSX from 'xlsx';

const AdminEditGrade = () => {
  const params = useParams();
  const id = (params.id as string) || '';
  const { useGet } = useCrud({ modelName: 'grade' });
  const { data: grade, isLoading, error } = useGet(id);

  const t = useTranslations();

  const exportToExcel = (rows: Row<GetGradeRes>[]) => {
    const rowData = rows.map((row) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const item = row.original as Record<string, any>;
      // Create a new object with only the columns we want, with custom names
      const totalPoint =
        Number(item.attendancePoint) * 0.1 +
        (((Number(item.midTermPoint) + Number(item.finalPoint)) / 2 + Number(item.finalGrade)) /
          2) *
          0.3 +
        Number(item.examPoint) * 0.6;
      let gpa;
      if (totalPoint >= 8.5 && totalPoint <= 10) {
        gpa = 4.0;
      } else if (totalPoint >= 8.0 && totalPoint < 8.5) {
        gpa = 3.5;
      } else if (totalPoint >= 7.0 && totalPoint < 8.0) {
        gpa = 3.0;
      } else if (totalPoint >= 6.5 && totalPoint < 7.0) {
        gpa = 2.5;
      } else if (totalPoint >= 5.5 && totalPoint < 6.5) {
        gpa = 2.0;
      } else if (totalPoint >= 5.0 && totalPoint < 5.5) {
        gpa = 1.5;
      } else if (totalPoint >= 4.0 && totalPoint < 5.0) {
        gpa = 1.0;
      } else {
        gpa = 0.0; // Default value, adjust as needed
      }

      const result = () => {
        if (totalPoint >= 4.0) return 'pass';
        return 'fail';
      };

      return {
        [t('grade.fields.studentCode.label')]: item.student.code,
        [t('grade.fields.studentName.label')]: item.student.name,
        [t('grade.fields.attendancePoint.label')]: Number(item.attendancePoint).toFixed(1),
        [t('grade.fields.midTermPoint.label')]: Number(item.midTermPoint).toFixed(1),
        [t('grade.fields.finalPoint.label')]: Number(item.finalPoint).toFixed(1),
        [t('grade.fields.finalGrade.label')]: Number(item.finalGrade).toFixed(1),
        [t('grade.fields.examPoint.label')]: Number(item.examPoint).toFixed(1),
        [t('grade.fields.totalGrade.label')]: totalPoint.toFixed(1),
        [t('grade.fields.gpa.label')]: gpa.toFixed(1),
        [t('grade.fields.result.label')]: t(`enum.result.${result()}`),
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
    XLSX.writeFile(workbook, `grade-${date}.xlsx`);
  };

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
      exportToExcel={exportToExcel}
    />
  );
};

export default AdminEditGrade;
