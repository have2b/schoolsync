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
import { updateDepartmentSchema } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { redirect, useParams } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

export default function UpdateDepartment() {
  const t = useTranslations();
  const params = useParams();
  const id = (params.id as string) || '';

  const { useGet, useUpdate } = useCrud({ baseUrl: '/departments', modelName: 'department' });
  const { data: department } = useGet(id);
  const { mutate: updateDepartment } = useUpdate();

  const form = useForm<z.infer<typeof updateDepartmentSchema>>({
    resolver: zodResolver(updateDepartmentSchema),
    defaultValues: {
      departmentCode: '',
      name: '',
      detail: '',
    },
  });

  useEffect(() => {
    if (department) {
      form.reset({
        departmentCode: department.departmentCode,
        name: department.name,
        detail: department.detail ?? '',
      });
    }
  }, [department, form]);

  function onSubmit(values: z.infer<typeof updateDepartmentSchema>) {
    try {
      updateDepartment(
        { id, data: values },
        {
          onSuccess: () => {
            const locale = (params.locale as string) || 'vi';

            setTimeout(() => {
              redirect(`/${locale}/department`);
            }, 1000);
          },
        }
      );
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
          {t('navigation.edit') + ' ' + t('department.title')}
        </span>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="departmentCode"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>{t('department.departmentCode')}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t('department.namePlaceholder')}
                    type="text"
                    readOnly
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
