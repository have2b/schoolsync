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
import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

export default function AdminUpdateDepartment() {
  const t = useTranslations();
  const params = useParams();
  const router = useRouter();
  const id = (params.id as string) || '';

  const { useGet, useUpdate } = useCrud({ modelName: 'department' });
  const { data: department } = useGet(id);
  const { mutate: updateDepartment } = useUpdate();

  const form = useForm<z.infer<typeof updateDepartmentSchema>>({
    resolver: zodResolver(updateDepartmentSchema),
    defaultValues: {
      code: '',
      name: '',
      detail: '',
    },
  });

  useEffect(() => {
    if (department) {
      form.reset({
        code: department.code,
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
          onSuccess: () => router.back(),
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
          {t('navigation.sections.edit') + ' ' + t('department.title').toLowerCase()}
        </span>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>{t('department.fields.code.label')}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t('department.fields.code.placeholder')}
                    type="text"
                    readOnly
                    disabled
                    className="w-full bg-zinc-100"
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
                <FormLabel required>{t('department.fields.name.label')}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t('department.fields.name.placeholder')}
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
                <FormLabel>{t('department.fields.detail.label')}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t('department.fields.detail.label')}
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
          <Button type="button" variant={'destructive'} onClick={() => router.back()}>
            {t('common.actions.cancel')}
          </Button>
          <Button type="submit">{t('common.actions.submit')}</Button>
        </div>
      </form>
    </Form>
  );
}
