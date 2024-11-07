'use client';

import { Button } from '@/components';
import { Department } from '@prisma/client';
import { ColumnDef, Row } from '@tanstack/react-table';
import { SquarePenIcon, Trash2Icon } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

// Create a separate component for the action cell
const ActionCell = ({ id }: { id: number }) => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="flex items-center justify-end gap-2 text-right">
      <Button variant="outline" size="icon" onClick={() => router.push(`${pathname}/edit/${id}`)}>
        <SquarePenIcon className="size-4" />
      </Button>
      <Button variant="destructive" size="icon">
        <Trash2Icon className="size-4" />
      </Button>
    </div>
  );
};

function SelectCell<T>(row: Row<T>) {
  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        className="h-4 w-4 rounded border-gray-300"
        checked={row.getIsSelected()}
        onChange={(e) => row.toggleSelected(!!e.target.checked)}
      />
      <span className="ml-2">{(row.original as { departmentCode: string }).departmentCode}</span>
    </div>
  );
}

export const departmentColumn: ColumnDef<Department>[] = [
  {
    id: 'code',
    accessorKey: 'departmentCode',
    header: 'code',
    cell: ({ row }) => SelectCell(row),
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
    cell: ({ row }) => <ActionCell id={row.original.id} />,
  },
];
