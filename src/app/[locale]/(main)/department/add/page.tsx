'use client';

import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@/components';
import { useCrud } from '@/hooks/useCrud';
import { createDepartmentSchema } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { redirect, useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

export default function AddDepartment() {
  const params = useParams();
  const t = useTranslations();
  const form = useForm<z.infer<typeof createDepartmentSchema>>({
    resolver: zodResolver(createDepartmentSchema),
    defaultValues: {
      name: '',
      detail: '',
    },
  });

  const { useCreate } = useCrud({ baseUrl: '/departments', modelName: 'department' });
  const { mutate: createDepartment } = useCreate();

  function onSubmit(values: z.infer<typeof createDepartmentSchema>) {
    try {
      createDepartment(values, {
        onSuccess: async () => {
          const locale = ((await params).locale as string) || 'vi';

          redirect(`/${locale}/department`);
        },
      });
    } catch (error) {
      console.error('Form submission error', error);
      toast.error(t('common.error'));
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-10 w-full space-y-10 rounded-md bg-white p-10 shadow-xl"
      >
        <span className="text-2xl font-semibold">
          {t('tableButtons.addNew') + ' ' + t('department.title')}
        </span>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel required>{t('department.name')}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t('department.namePlaceholder')}
                    type="text"
                    required
                    className="w-full"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="detail"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>{t('department.detail')}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t('department.detailPlaceholder')}
                    type="text"
                    className="w-full"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex items-center justify-end gap-3">
          <Button type="button" variant={'destructive'}>
            {t('common.cancel')}
          </Button>
          <Button type="submit">{t('common.submit')}</Button>
        </div>
      </form>
    </Form>
  );
}
