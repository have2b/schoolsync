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
import { createRosterSchema } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Course, Teacher } from '@prisma/client';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

export default function AdminAddRoster() {
  const router = useRouter();
  const t = useTranslations();

  const form = useForm<z.infer<typeof createRosterSchema>>({
    resolver: zodResolver(createRosterSchema),
    defaultValues: {
      capacity: '0',
      year: '',
      semester: '',
      startDate: '' as unknown as Date,
      endDate: '' as unknown as Date,
      teacherId: '',
      courseId: '',
    },
  });

  const { useCreate } = useCrud({ modelName: 'roster' });
  const { mutate: createRoster } = useCreate();
  const [courses, setCourses] = useState<Course[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);

  useEffect(() => {
    async function fetchData() {
      const [coursesRes, teachersRes] = await Promise.all([
        fetchListData('courses/get-list'),
        fetchListData('teachers/get-list'),
      ]);
      setCourses(coursesRes.data);
      setTeachers(teachersRes.data);
    }
    fetchData();
  }, []);

  function onSubmit(values: z.infer<typeof createRosterSchema>) {
    try {
      const updatedValues = {
        ...values,
        courseId: Number(values.courseId),
        teacherId: Number(values.teacherId),
        capacity: Number(values.capacity),
        year: Number(values.year),
        semester: Number(values.semester),
      };
      createRoster(updatedValues, {
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
          {t('navigation.sections.add') + ' ' + t('roster.title').toLowerCase()}
        </span>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="capacity"
            render={({ field }) => (
              <FormItem>
                <FormLabel required>{t('roster.fields.capacity.label')}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t('roster.fields.capacity.placeholder')}
                    type="text"
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
              <FormItem>
                <FormLabel required>{t('roster.fields.year.label')}</FormLabel>
                <FormControl>
                  <Input placeholder={t('roster.fields.year.placeholder')} type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="semester"
            render={({ field }) => (
              <FormItem>
                <FormLabel required>{t('roster.fields.semester.label')}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t('roster.fields.semester.placeholder')}
                    type="text"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem className="flex flex-col justify-end">
                <FormLabel required>{t('roster.fields.endDate.label')}</FormLabel>
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
                          <span>{t('roster.fields.endDate.placeholder')}</span>
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
            name="endDate"
            render={({ field }) => (
              <FormItem className="flex flex-col justify-end">
                <FormLabel required>{t('roster.fields.startDate.label')}</FormLabel>
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
                          <span>{t('roster.fields.startDate.placeholder')}</span>
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
                <FormLabel required>{t('roster.fields.teacher.label')}</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={t('roster.fields.teacher.placeholder')} />
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
          <FormField
            control={form.control}
            name="courseId"
            render={({ field }) => (
              <FormItem>
                <FormLabel required>{t('roster.fields.course.label')}</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={t('roster.fields.course.placeholder')} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {courses?.map(({ id, name }: Course) => (
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
