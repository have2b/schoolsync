'use client';

import { ActionCell, Input } from '@/components';
import { Department } from '@prisma/client';
import { ColumnDef } from '@tanstack/react-table';

export const departmentColumn: ColumnDef<Department>[] = [
  {
    id: 'code',
    accessorKey: 'code',
    header: 'code',
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Input
          type="checkbox"
          className="size-4"
          checked={row.getIsSelected()}
          onChange={(e) => row.toggleSelected(!!e.target.checked)}
        />
        <span>{(row.original as { code: string }).code}</span>
      </div>
    ),
  },
  {
    id: 'name',
    accessorKey: 'name',
    header: 'name',
  },
  {
    id: 'detail',
    accessorKey: 'detail',
    header: 'detail',
  },
  {
    id: 'action',
    header: 'action',
    cell: ({ row }) => (
      <ActionCell id={row.original.id} modelName="department" baseUrl="/departments" />
    ),
  },
];
