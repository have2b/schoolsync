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
import { updateCourseSchema } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';
import LoadingForm from './loading';

export default function AdminUpdateCourse() {
  const t = useTranslations();
  const params = useParams();
  const router = useRouter();
  const id = (params.id as string) || '';

  const { useGet, useUpdate } = useCrud({ modelName: 'course' });
  const { data: course } = useGet(id);
  const { mutate: updateCourse } = useUpdate();

  const form = useForm<z.infer<typeof updateCourseSchema>>({
    resolver: zodResolver(updateCourseSchema),
    defaultValues: {
      code: '',
      name: '',
      credit: '',
      lesson: '',
    },
  });

  useEffect(() => {
    if (course) {
      form.reset({
        code: course.code,
        name: course.name,
        credit: course.credit.toString(),
        lesson: course.lesson.toString(),
      });
    }
  }, [course, form]);

  function onSubmit(values: z.infer<typeof updateCourseSchema>) {
    try {
      const updatedValus = {
        ...values,
        credit: Number(values.credit),
        lesson: Number(values.lesson),
      };
      updateCourse(
        { id, data: updatedValus },
        {
          onSuccess: () => router.back(),
        }
      );
    } catch (error) {
      console.error('Form submission error', error);
      toast.error(t('common.error'));
    }
  }

  if (!course) return <LoadingForm />;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-10 w-full space-y-10 rounded-md bg-white p-10 shadow-xl"
      >
        <span className="text-2xl font-semibold">
          {t('navigation.sections.add') + ' ' + t('course.title').toLowerCase()}
        </span>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel required>{t('course.fields.code.label')}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t('course.fields.code.placeholder')}
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
            name="name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel required>{t('course.fields.name.label')}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t('course.fields.name.placeholder')}
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
            name="credit"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel required>{t('course.fields.credit.label')}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t('course.fields.credit.placeholder')}
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
            name="lesson"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel required>{t('course.fields.lesson.label')}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t('course.fields.lesson.placeholder')}
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
        </div>

        <div className="flex items-center justify-end gap-3">
          <Button type="button" variant={'destructive'}>
            {t('common.actions.cancel')}
          </Button>
          <Button type="submit">{t('common.actions.submit')}</Button>
        </div>
      </form>
    </Form>
  );
}
