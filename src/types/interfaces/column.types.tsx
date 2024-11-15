'use client';

import { ActionCell, Button, Input } from '@/components';
import { GetListCourseRes } from '@/server/course';
import { GetListGroupRes } from '@/server/group';
import { GetListStudentRes } from '@/server/student';
import { Department, Teacher } from '@prisma/client';
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
    accessorFn: (row) => row.department?.name,
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

export const courseColumn: ColumnDef<GetListCourseRes>[] = [
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
    id: 'year',
    accessorKey: 'year',
    header: ({ column }) => <HeaderCol column={column} modelName="course" />,
    cell: ({ row }) => <div>{row.getValue('year')}</div>,
  },
  {
    id: 'semester',
    accessorKey: 'semester',
    header: ({ column }) => <HeaderCol column={column} modelName="course" />,
    cell: ({ row }) => <div>{row.getValue('semester')}</div>,
  },
  {
    id: 'teacher',
    accessorFn: (row) => row.teacher?.name,
    header: ({ column }) => <HeaderCol column={column} modelName="course" />,
    cell: ({ row }) => <div>{row.getValue('teacher')}</div>,
  },
  {
    id: 'action',
    header: () => <HeaderCol column={{} as Column<unknown>} modelName="course" sortable={false} />,
    cell: ({ row }) => <ActionCell id={row.original.id} modelName="course" />,
    enableSorting: false,
    enableHiding: false,
  },
];
