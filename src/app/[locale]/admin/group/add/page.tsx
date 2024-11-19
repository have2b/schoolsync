'use client';

import { fetchListData } from '@/action';
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components';
import { useCrud } from '@/hooks/useCrud';
import { createGroupSchema } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Department, Teacher } from '@prisma/client';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

export default function AdminAddGroup() {
  const router = useRouter();
  const t = useTranslations();

  const form = useForm<z.infer<typeof createGroupSchema>>({
    resolver: zodResolver(createGroupSchema),
    defaultValues: {
      name: '',
      capacity: '0',
      teacherId: '',
      departmentId: '',
    },
  });

  const { useCreate } = useCrud({ modelName: 'group' });
  const { mutate: createGroup } = useCreate();
  const [departments, setDepartments] = useState<Department[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);

  useEffect(() => {
    async function fetchData() {
      const [departmentsRes, teachersRes] = await Promise.all([
        fetchListData('departments/get-list'),
        fetchListData('teachers/get-list'),
      ]);
      setDepartments(departmentsRes.data);
      setTeachers(teachersRes.data);
    }
    fetchData();
  }, []);

  function onSubmit(values: z.infer<typeof createGroupSchema>) {
    try {
      const updatedValues = {
        ...values,
        departmentId: Number(values.departmentId),
        teacherId: Number(values.teacherId),
        capacity: Number(values.capacity),
      };
      createGroup(updatedValues, {
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
          {t('navigation.sections.add') + ' ' + t('group.title').toLowerCase()}
        </span>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel required>{t('group.fields.name.label')}</FormLabel>
                <FormControl>
                  <Input placeholder={t('group.fields.name.placeholder')} type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="capacity"
            render={({ field }) => (
              <FormItem>
                <FormLabel required>{t('group.fields.capacity.label')}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t('group.fields.capacity.placeholder')}
                    type="number"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="teacherId"
            render={({ field }) => (
              <FormItem>
                <FormLabel required>{t('group.fields.teacher.label')}</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={t('group.fields.teacher.placeholder')} />
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
            name="departmentId"
            render={({ field }) => (
              <FormItem>
                <FormLabel required>{t('group.fields.department.label')}</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={t('group.fields.department.placeholder')} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {departments?.map(({ id, name }: Department) => (
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
          <Button type="button" variant={'destructive'} onClick={() => router.back()}>
            {t('common.actions.cancel')}
          </Button>
          <Button type="submit">{t('common.actions.submit')}</Button>
        </div>
      </form>
    </Form>
  );
}
