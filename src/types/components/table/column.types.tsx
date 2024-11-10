'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  Button,
  Input,
} from '@/components';
import { useCrud } from '@/hooks';
import { Department } from '@prisma/client';
import { ColumnDef, Row } from '@tanstack/react-table';
import { SquarePenIcon, Trash2Icon } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

// Create a separate component for the action cell
const ActionCell = ({
  id,
  modelName,
  baseUrl,
}: {
  id: number;
  modelName: string;
  baseUrl: string;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const { useDelete } = useCrud({
    modelName,
    baseUrl,
  });

  const { mutate: deleteData } = useDelete();

  const handleDelete = () => {
    deleteData(id.toString(), {
      onSuccess: () => {
        setShowDeleteDialog(false);
      },
    });
  };

  return (
    <>
      <div className="flex items-center justify-end gap-2 text-right">
        <Button variant="outline" size="icon" onClick={() => router.push(`${pathname}/edit/${id}`)}>
          <SquarePenIcon className="size-4" />
        </Button>
        <Button variant="destructive" size="icon" onClick={() => setShowDeleteDialog(true)}>
          <Trash2Icon className="size-4" />
        </Button>
      </div>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the department.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

function SelectCell<T>(row: Row<T>) {
  return (
    <div className="flex items-center gap-2">
      <Input
        type="checkbox"
        className="size-4"
        checked={row.getIsSelected()}
        onChange={(e) => row.toggleSelected(!!e.target.checked)}
      />
      <span>{(row.original as { departmentCode: string }).departmentCode}</span>
    </div>
  );
}

export const departmentColumn: ColumnDef<Department>[] = [
  {
    id: 'departmentCode',
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
    cell: ({ row }) => (
      <ActionCell id={row.original.id} modelName="department" baseUrl="/departments" />
    ),
  },
];
