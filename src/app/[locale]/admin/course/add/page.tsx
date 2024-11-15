'use client';

import { fetchListData } from '@/action';
import {
  Button,
  Calendar,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components';
import { useCrud } from '@/hooks/useCrud';
import { cn } from '@/lib/utils';
import { createCourseSchema } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Teacher } from '@prisma/client';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
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
      credit: '',
      lesson: '',
      semester: '',
      year: '',
      startedAt: '' as unknown as Date,
      endedAt: '' as unknown as Date,
      teacherId: '',
    },
  });

  const { useCreate } = useCrud({ modelName: 'course' });
  const { mutate: createCourse } = useCreate();
  const [teachers, setTeachers] = useState<Teacher[]>([]);

  useEffect(() => {
    async function fetchTeachers() {
      const res = await fetchListData('teachers/get-list');
      setTeachers(res.data);
    }
    fetchTeachers();
  }, []);

  function onSubmit(values: z.infer<typeof createCourseSchema>) {
    try {
      const updatedValus = {
        ...values,
        credit: Number(values.credit),
        lesson: Number(values.lesson),
        semester: Number(values.semester),
        year: Number(values.year),
        teacherId: Number(values.teacherId),
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
          <FormField
            control={form.control}
            name="year"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel required>{t('course.fields.year.label')}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t('course.fields.year.placeholder')}
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
            name="semester"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel required>{t('course.fields.semester.label')}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t('course.fields.semester.placeholder')}
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
            name="startedAt"
            render={({ field }) => (
              <FormItem className="flex flex-col justify-end">
                <FormLabel required>{t('course.fields.startedAt.label')}</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'w-full pl-3 text-left font-normal',
                          !field.value && 'text-muted-foreground'
                        )}
                      >
                        {field.value ? (
                          format(field.value, 'dd/MM/yyyy')
                        ) : (
                          <span>{t('course.fields.startedAt.placeholder')}</span>
                        )}
                        <CalendarIcon className="ml-auto size-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      captionLayout="dropdown"
                      selected={field.value ? new Date(field.value) : undefined}
                      onSelect={field.onChange}
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="endedAt"
            render={({ field }) => (
              <FormItem className="flex flex-col justify-end">
                <FormLabel required>{t('course.fields.endedAt.label')}</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'w-full pl-3 text-left font-normal',
                          !field.value && 'text-muted-foreground'
                        )}
                      >
                        {field.value ? (
                          format(field.value, 'dd/MM/yyyy')
                        ) : (
                          <span>{t('course.fields.endedAt.placeholder')}</span>
                        )}
                        <CalendarIcon className="ml-auto size-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      captionLayout="dropdown"
                      selected={field.value ? new Date(field.value) : undefined}
                      onSelect={field.onChange}
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="teacherId"
            render={({ field }) => (
              <FormItem>
                <FormLabel required>{t('course.fields.teacher.label')}</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={t('course.fields.teacher.placeholder')} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {teachers?.map(({ id, name }: Teacher) => (
                      <SelectItem key={id} value={id.toString()}>
                        {name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
