'use client';

import { ActionCell, Button, Input } from '@/components';
import { Department, Teacher } from '@prisma/client';
import { Column, ColumnDef } from '@tanstack/react-table';
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
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      className="flex items-center gap-2 py-2 font-semibold text-secondary-foreground transition-colors hover:bg-muted/50 hover:text-secondary"
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

export const departmentColumn: ColumnDef<Department>[] = [
  {
    id: 'code',
    accessorKey: 'code',
    header: ({ column }) => <HeaderCol column={column} modelName="department" />,
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
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
    cell: ({ row }) => <div className="pl-4">{row.getValue('name')}</div>,
  },
  {
    id: 'detail',
    accessorKey: 'detail',
    header: ({ column }) => <HeaderCol column={column} modelName="department" />,
    cell: ({ row }) => <div className="pl-4">{row.getValue('detail')}</div>,
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
      <div className="flex items-center gap-2">
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
    cell: ({ row }) => <div className="pl-4">{row.getValue('name')}</div>,
  },
  {
    id: 'degree',
    accessorKey: 'degree',
    header: ({ column }) => <HeaderCol column={column} modelName="teacher" />,
    cell: ({ row }) => <div className="pl-4">{row.getValue('degree')}</div>,
  },
  {
    id: 'major',
    accessorKey: 'major',
    header: ({ column }) => <HeaderCol column={column} modelName="teacher" />,
    cell: ({ row }) => <div className="pl-4">{row.getValue('major')}</div>,
  },
  {
    id: 'action',
    header: () => <HeaderCol column={{} as Column<unknown>} modelName="teacher" sortable={false} />,
    cell: ({ row }) => <ActionCell id={row.original.id} modelName="teacher" />,
    enableSorting: false,
    enableHiding: false,
  },
];
