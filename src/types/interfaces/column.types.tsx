'use client';

import { ActionCell, Button, Input, TableMeta } from '@/components';
import { GetGradeRes } from '@/server/grade';
import { GetListGroupRes } from '@/server/group';
import { GetListRosterRes } from '@/server/roster';
import { GetListStudentRes } from '@/server/student';
import { Course, Department, Teacher } from '@prisma/client';
import { Column, ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { ArrowUpDown } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface RenderHeaderProps<T> {
  column: Column<T>;
  modelName: string;
  sortable?: boolean;
}

function HeaderCol<T>({ column, modelName, sortable = true }: RenderHeaderProps<T>) {
  const t = useTranslations(sortable ? modelName : 'common.columns');
  return sortable ? (
    <Button
      type="button"
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      className="flex w-full items-center gap-2 py-2 font-semibold text-secondary-foreground transition-colors hover:bg-muted/50 hover:text-secondary"
    >
      {t('fields.'.concat(column.id, '.label'))}
      <ArrowUpDown className="size-4" />
    </Button>
  ) : (
    <div className="px-4 py-2 text-right text-sm font-semibold text-muted-foreground">
      {t('action')}
    </div>
  );
}

function CellTranslated({ value, modelName }: { value: string; modelName: string }) {
  const t = useTranslations(modelName);
  return <span>{t(value)}</span>;
}
interface EditableCellProps {
  value: number;
  onChange: (value: number) => void; // Changed to handle number instead of string
  disabled?: boolean;
}

// Editable Cell Component
function EditableCell({ value, onChange, disabled = false }: EditableCellProps) {
  return (
    <Input
      type="number"
      min={0}
      max={10}
      step={0.5}
      value={Number(value).toFixed(1)}
      onChange={(e) => onChange(Number(parseFloat(e.target.value).toFixed(1)))}
      disabled={disabled}
      className="text-center"
    />
  );
}

export const departmentColumn: ColumnDef<Department>[] = [
  {
    id: 'code',
    accessorKey: 'code',
    header: ({ column }) => <HeaderCol column={column} modelName="department" />,
    cell: ({ row }) => (
      <div className="flex items-center justify-center gap-2">
        <Input
          type="checkbox"
          className="size-4"
          checked={row.getIsSelected()}
          onChange={(e) => row.toggleSelected(!!e.target.checked)}
        />
        <span>{row.getValue('code')}</span>
      </div>
    ),
  },
  {
    id: 'name',
    accessorKey: 'name',
    header: ({ column }) => <HeaderCol column={column} modelName="department" />,
    cell: ({ row }) => <div>{row.getValue('name')}</div>,
  },
  {
    id: 'detail',
    accessorKey: 'detail',
    header: ({ column }) => <HeaderCol column={column} modelName="department" />,
    cell: ({ row }) => <div>{row.getValue('detail')}</div>,
  },
  {
    id: 'action',
    header: () => (
      <HeaderCol column={{} as Column<unknown>} modelName="department" sortable={false} />
    ),
    cell: ({ row }) => <ActionCell id={row.original.id} modelName="department" />,
    enableSorting: false,
    enableHiding: false,
  },
];

export const teacherColumn: ColumnDef<Teacher>[] = [
  {
    id: 'code',
    accessorKey: 'code',
    header: ({ column }) => <HeaderCol column={column} modelName="teacher" />,
    cell: ({ row }) => (
      <div className="flex items-center justify-center gap-2">
        <Input
          type="checkbox"
          className="size-4"
          checked={row.getIsSelected()}
          onChange={(e) => row.toggleSelected(!!e.target.checked)}
        />
        <span>{row.getValue('code')}</span>
      </div>
    ),
  },
  {
    id: 'name',
    accessorKey: 'name',
    header: ({ column }) => <HeaderCol column={column} modelName="teacher" />,
    cell: ({ row }) => <div>{row.getValue('name')}</div>,
  },
  {
    id: 'degree',
    accessorKey: 'degree',
    header: ({ column }) => <HeaderCol column={column} modelName="teacher" />,
    cell: ({ row }) => (
      <CellTranslated
        value={(row.getValue('degree') as string).toLowerCase()}
        modelName="enum.degree"
      />
    ),
  },
  {
    id: 'major',
    accessorKey: 'major',
    header: ({ column }) => <HeaderCol column={column} modelName="teacher" />,
    cell: ({ row }) => <div>{row.getValue('major')}</div>,
  },
  {
    id: 'action',
    header: () => <HeaderCol column={{} as Column<unknown>} modelName="teacher" sortable={false} />,
    cell: ({ row }) => <ActionCell id={row.original.id} modelName="teacher" />,
    enableSorting: false,
    enableHiding: false,
  },
];

export const groupColumn: ColumnDef<GetListGroupRes>[] = [
  {
    id: 'code',
    accessorKey: 'code',
    header: ({ column }) => <HeaderCol column={column} modelName="group" />,
    cell: ({ row }) => (
      <div className="flex items-center justify-center gap-2">
        <Input
          type="checkbox"
          className="size-4"
          checked={row.getIsSelected()}
          onChange={(e) => row.toggleSelected(!!e.target.checked)}
        />
        <span>{row.getValue('code')}</span>
      </div>
    ),
  },
  {
    id: 'name',
    accessorKey: 'name',
    header: ({ column }) => <HeaderCol column={column} modelName="group" />,
    cell: ({ row }) => <div>{row.getValue('name')}</div>,
  },
  {
    id: 'capacity',
    accessorKey: 'capacity',
    header: ({ column }) => <HeaderCol column={column} modelName="group" />,
    cell: ({ row }) => <div>{row.getValue('capacity')}</div>,
  },
  {
    id: 'teacher',
    accessorFn: (row) => row.teacher?.name,
    header: ({ column }) => <HeaderCol column={column} modelName="group" />,
    cell: ({ row }) => <div>{row.getValue('teacher')}</div>,
  },
  {
    id: 'department',
    accessorFn: (row) => row.department?.name,
    header: ({ column }) => <HeaderCol column={column} modelName="group" />,
    cell: ({ row }) => <div>{row.getValue('department')}</div>,
  },
  {
    id: 'action',
    header: () => <HeaderCol column={{} as Column<unknown>} modelName="group" sortable={false} />,
    cell: ({ row }) => <ActionCell id={row.original.id} modelName="group" />,
    enableSorting: false,
    enableHiding: false,
  },
];

export const studentColumn: ColumnDef<GetListStudentRes>[] = [
  {
    id: 'code',
    accessorKey: 'code',
    header: ({ column }) => <HeaderCol column={column} modelName="student" />,
    cell: ({ row }) => (
      <div className="flex items-center justify-center gap-2">
        <Input
          type="checkbox"
          className="size-4"
          checked={row.getIsSelected()}
          onChange={(e) => row.toggleSelected(!!e.target.checked)}
        />
        <span>{row.getValue('code')}</span>
      </div>
    ),
  },
  {
    id: 'name',
    accessorKey: 'name',
    header: ({ column }) => <HeaderCol column={column} modelName="student" />,
    cell: ({ row }) => <div>{row.getValue('name')}</div>,
  },
  {
    id: 'email',
    accessorFn: (row) => row.account?.email,
    header: ({ column }) => <HeaderCol column={column} modelName="student" />,
    cell: ({ row }) => <div>{row.getValue('email')}</div>,
  },
  {
    id: 'dob',
    accessorKey: 'dob',
    header: ({ column }) => <HeaderCol column={column} modelName="student" />,
    cell: ({ row }) => {
      const dob = row.getValue('dob');
      const formattedDate = dob ? format(new Date(dob.toString()), 'dd/MM/yyyy') : '';
      return <div>{formattedDate}</div>;
    },
  },
  {
    id: 'gender',
    accessorKey: 'gender',
    header: ({ column }) => <HeaderCol column={column} modelName="student" />,
    cell: ({ row }) => (
      <CellTranslated
        value={(row.getValue('gender') as string).toLowerCase()}
        modelName="enum.gender"
      />
    ),
  },
  {
    id: 'group',
    accessorFn: (row) => row.group?.name,
    header: ({ column }) => <HeaderCol column={column} modelName="student" />,
    cell: ({ row }) => <div>{row.getValue('group')}</div>,
  },
  {
    id: 'department',
    accessorFn: (row) => row.group.department?.name,
    header: ({ column }) => <HeaderCol column={column} modelName="student" />,
    cell: ({ row }) => <div>{row.getValue('department')}</div>,
  },
  {
    id: 'action',
    header: () => <HeaderCol column={{} as Column<unknown>} modelName="student" sortable={false} />,
    cell: ({ row }) => <ActionCell id={row.original.id} modelName="student" />,
    enableSorting: false,
    enableHiding: false,
  },
];

export const courseColumn: ColumnDef<Course>[] = [
  {
    id: 'code',
    accessorKey: 'code',
    header: ({ column }) => <HeaderCol column={column} modelName="course" />,
    cell: ({ row }) => (
      <div className="flex items-center justify-center gap-2">
        <Input
          type="checkbox"
          className="size-4"
          checked={row.getIsSelected()}
          onChange={(e) => row.toggleSelected(!!e.target.checked)}
        />
        <span>{row.getValue('code')}</span>
      </div>
    ),
  },
  {
    id: 'name',
    accessorKey: 'name',
    header: ({ column }) => <HeaderCol column={column} modelName="course" />,
    cell: ({ row }) => <div>{row.getValue('name')}</div>,
  },
  {
    id: 'credit',
    accessorKey: 'credit',
    header: ({ column }) => <HeaderCol column={column} modelName="course" />,
    cell: ({ row }) => <div>{row.getValue('credit')}</div>,
  },
  {
    id: 'lesson',
    accessorKey: 'lesson',
    header: ({ column }) => <HeaderCol column={column} modelName="course" />,
    cell: ({ row }) => <div>{row.getValue('lesson')}</div>,
  },
  {
    id: 'action',
    header: () => <HeaderCol column={{} as Column<unknown>} modelName="course" sortable={false} />,
    cell: ({ row }) => <ActionCell id={row.original.id} modelName="course" />,
    enableSorting: false,
    enableHiding: false,
  },
];

export const rosterColumn: ColumnDef<GetListRosterRes>[] = [
  {
    id: 'code',
    accessorKey: 'code',
    header: ({ column }) => <HeaderCol column={column} modelName="roster" />,
    cell: ({ row }) => (
      <div className="flex items-center justify-center gap-2">
        <Input
          type="checkbox"
          className="size-4"
          checked={row.getIsSelected()}
          onChange={(e) => row.toggleSelected(!!e.target.checked)}
        />
        <span>{row.getValue('code')}</span>
      </div>
    ),
  },
  {
    id: 'name',
    accessorKey: 'name',
    header: ({ column }) => <HeaderCol column={column} modelName="roster" />,
    cell: ({ row }) => <div>{row.getValue('name')}</div>,
  },
  {
    id: 'capacity',
    accessorKey: 'capacity',
    header: ({ column }) => <HeaderCol column={column} modelName="roster" />,
    cell: ({ row }) => <div>{row.getValue('capacity')}</div>,
  },
  {
    id: 'semester',
    accessorKey: 'semester',
    header: ({ column }) => <HeaderCol column={column} modelName="roster" />,
    cell: ({ row }) => <div>{row.getValue('semester')}</div>,
  },
  {
    id: 'year',
    accessorKey: 'year',
    header: ({ column }) => <HeaderCol column={column} modelName="roster" />,
    cell: ({ row }) => <div>{row.getValue('year')}</div>,
  },
  {
    id: 'action',
    header: () => <HeaderCol column={{} as Column<unknown>} modelName="roster" sortable={false} />,
    cell: ({ row }) => <ActionCell id={row.original.id} modelName="roster" />,
    enableSorting: false,
    enableHiding: false,
  },
];

export const gradeColumn: ColumnDef<GetListRosterRes>[] = [
  {
    id: 'code',
    accessorKey: 'code',
    header: ({ column }) => <HeaderCol column={column} modelName="roster" />,
    cell: ({ row }) => <span>{row.getValue('code')}</span>,
  },
  {
    id: 'name',
    accessorKey: 'name',
    header: ({ column }) => <HeaderCol column={column} modelName="roster" />,
    cell: ({ row }) => <div>{row.getValue('name')}</div>,
  },
  {
    id: 'semester',
    accessorKey: 'semester',
    header: ({ column }) => <HeaderCol column={column} modelName="roster" />,
    cell: ({ row }) => <div>{row.getValue('semester')}</div>,
  },
  {
    id: 'year',
    accessorKey: 'year',
    header: ({ column }) => <HeaderCol column={column} modelName="roster" />,
    cell: ({ row }) => <div>{row.getValue('year')}</div>,
  },
  {
    id: 'updatedAt',
    accessorKey: 'updatedAt',
    header: ({ column }) => <HeaderCol column={column} modelName="roster" />,
    cell: ({ row }) => {
      const updatedAt = row.getValue('updatedAt');
      const formattedDate = updatedAt
        ? format(new Date(updatedAt.toString()), 'dd/MM/yyyy HH:mm:ss')
        : '';
      return <div>{formattedDate}</div>;
    },
  },
  {
    id: 'action',
    header: () => <HeaderCol column={{} as Column<unknown>} modelName="roster" sortable={false} />,
    cell: ({ row }) => <ActionCell id={row.original.id} modelName="roster" showDelete={false} />,
    enableSorting: false,
    enableHiding: false,
  },
];

export const gradeItemColumn: ColumnDef<GetGradeRes>[] = [
  {
    id: 'studentCode',
    accessorFn: (row) => row.student?.code,
    header: ({ column }) => <HeaderCol column={column} modelName="grade" />,
    cell: ({ row }) => (
      <div className="flex items-center justify-center gap-2">
        <Input
          type="checkbox"
          className="size-4"
          checked={row.getIsSelected()}
          onChange={(e) => row.toggleSelected(!!e.target.checked)}
        />
        <span>{row.getValue('studentCode')}</span>
      </div>
    ),
  },
  {
    id: 'studentName',
    accessorFn: (row) => row.student?.name,
    header: ({ column }) => <HeaderCol column={column} modelName="grade" />,
    cell: ({ row }) => <div>{row.getValue('studentName')}</div>,
  },
  {
    id: 'attendancePoint',
    accessorKey: 'attendancePoint',
    header: ({ column }) => <HeaderCol column={column} modelName="grade" />,
    cell: ({ row, getValue, table }) => (
      <EditableCell
        value={getValue() as number}
        onChange={(newValue) => {
          (table.options.meta as TableMeta<GetGradeRes>)?.updateData(
            row.index,
            'attendancePoint',
            newValue
          );
        }}
      />
    ),
  },
  {
    id: 'midTermPoint',
    accessorKey: 'midTermPoint',
    header: ({ column }) => <HeaderCol column={column} modelName="grade" />,
    cell: ({ row, getValue, table }) => (
      <EditableCell
        value={getValue() as number}
        onChange={(newValue) => {
          (table.options.meta as TableMeta<GetGradeRes>)?.updateData(
            row.index,
            'midTermPoint',
            newValue
          );
        }}
      />
    ),
  },
  {
    id: 'finalPoint',
    accessorKey: 'finalPoint',
    header: ({ column }) => <HeaderCol column={column} modelName="grade" />,
    cell: ({ row, getValue, table }) => (
      <EditableCell
        value={getValue() as number}
        onChange={(newValue) => {
          (table.options.meta as TableMeta<GetGradeRes>)?.updateData(
            row.index,
            'finalPoint',
            newValue
          );
        }}
      />
    ),
  },
  {
    id: 'finalGrade',
    accessorKey: 'finalGrade',
    header: ({ column }) => <HeaderCol column={column} modelName="grade" />,
    cell: ({ row, getValue, table }) => (
      <EditableCell
        value={getValue() as number}
        onChange={(newValue) => {
          (table.options.meta as TableMeta<GetGradeRes>)?.updateData(
            row.index,
            'finalGrade',
            newValue
          );
        }}
      />
    ),
  },
  {
    id: 'examPoint',
    accessorKey: 'examPoint',
    header: ({ column }) => <HeaderCol column={column} modelName="grade" />,
    cell: ({ row, getValue, table }) => (
      <EditableCell
        value={getValue() as number}
        onChange={(newValue) => {
          (table.options.meta as TableMeta<GetGradeRes>)?.updateData(
            row.index,
            'examPoint',
            newValue
          );
        }}
      />
    ),
  },
  {
    id: 'totalGrade',
    accessorFn: (row) => {
      const totalPoint =
        Number(row.attendancePoint) * 0.1 +
        (((Number(row.midTermPoint) + Number(row.finalPoint)) / 2 + Number(row.finalGrade)) / 2) *
          0.3 +
        Number(row.examPoint) * 0.6;
      return totalPoint.toFixed(1);
    },

    header: ({ column }) => <HeaderCol column={column} modelName="grade" />,
    cell: ({ row }) => <div>{row.getValue('totalGrade')}</div>,
  },

  // New GPA column (example calculation, may need customization)
  {
    id: 'gpa',
    accessorFn: (row) => {
      const totalPoint =
        Number(row.attendancePoint) * 0.1 +
        (((Number(row.midTermPoint) + Number(row.finalPoint)) / 2 + Number(row.finalGrade)) / 2) *
          0.3 +
        Number(row.examPoint) * 0.6;

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

      return gpa.toFixed(1);
    },
    header: ({ column }) => <HeaderCol column={column} modelName="grade" />,
    cell: ({ row }) => <div>{row.getValue('gpa')}</div>,
  },
  // New Rank column
  {
    id: 'result',
    accessorFn: (row) => {
      const totalPoint =
        Number(row.attendancePoint) * 0.1 +
        (((Number(row.midTermPoint) + Number(row.finalPoint)) / 2 + Number(row.finalGrade)) / 2) *
          0.3 +
        Number(row.examPoint) * 0.6;

      if (totalPoint >= 4.0) return 'pass';
      return 'fail';
    },
    header: ({ column }) => <HeaderCol column={column} modelName="grade" />,
    cell: ({ row }) => (
      <CellTranslated
        value={(row.getValue('result') as string).toLowerCase()}
        modelName="enum.result"
      />
    ),
  },
  {
    id: 'action',
    header: () => <HeaderCol column={{} as Column<unknown>} modelName="grade" sortable={false} />,
    cell: ({ row }) => (
      <ActionCell id={row.original.studentId} modelName="grade" showEdit={false} />
    ),
    enableSorting: false,
    enableHiding: false,
  },
];
