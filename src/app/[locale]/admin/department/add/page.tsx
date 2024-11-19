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
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

export default function AdminAddDepartment() {
  const router = useRouter();
  const t = useTranslations();
  const form = useForm<z.infer<typeof createDepartmentSchema>>({
    resolver: zodResolver(createDepartmentSchema),
    defaultValues: {
      name: '',
      detail: '',
    },
  });

  const { useCreate } = useCrud({ modelName: 'department' });
  const { mutate: createDepartment } = useCreate();

  function onSubmit(values: z.infer<typeof createDepartmentSchema>) {
    try {
      createDepartment(values, {
        onSuccess: () => router.back(),
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
          {t('navigation.sections.add') + ' ' + t('department.title').toLowerCase()}
        </span>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
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
                    placeholder={t('department.fields.detail.placeholder')}
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
