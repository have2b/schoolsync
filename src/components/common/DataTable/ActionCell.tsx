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
} from '@/components';
import { useCrud } from '@/hooks';
import { CircleXIcon, SquarePenIcon, Trash2Icon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

export const ActionCell = ({
  id,
  modelName,
  baseUrl,
}: {
  id: number;
  modelName: string;
  baseUrl: string;
}) => {
  const t = useTranslations();
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
            <div className="flex items-center justify-center">
              <CircleXIcon className="size-36 text-red-500" />
            </div>
            <AlertDialogTitle>{t('common.areYouSure')}</AlertDialogTitle>
            <AlertDialogDescription>{t('common.deleteDescription')}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t('common.cancel')}</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {t('common.accept')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
