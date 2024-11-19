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
import { createCourseSchema } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

export default function AdminAddCourse() {
  const router = useRouter();
  const t = useTranslations();
  const form = useForm<z.infer<typeof createCourseSchema>>({
    resolver: zodResolver(createCourseSchema),
    defaultValues: {
      code: '',
      name: '',
      credit: 0,
      lesson: 0,
    },
  });

  const { useCreate } = useCrud({ modelName: 'course' });
  const { mutate: createCourse } = useCreate();

  function onSubmit(values: z.infer<typeof createCourseSchema>) {
    try {
      const updatedValus = {
        ...values,
        credit: Number(values.credit),
        lesson: Number(values.lesson),
      };
      createCourse(updatedValus, {
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
                    type="number"
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
                    type="number"
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
          <Button type="button" variant={'destructive'} onClick={() => router.back()}>
            {t('common.actions.cancel')}
          </Button>
          <Button type="submit">{t('common.actions.submit')}</Button>
        </div>
      </form>
    </Form>
  );
}
