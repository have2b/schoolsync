'use client';

import { fetchListData } from '@/action';
import {
  Button,
  FileInput,
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
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
import { createTeacherSchema } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Degree, Department } from '@prisma/client';
import { CloudUploadIcon, PaperclipIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

export default function AdminAddTeacher() {
  const router = useRouter();
  const t = useTranslations();

  const [files, setFiles] = useState<File[] | null>(null);

  const dropZoneConfig = {
    maxFiles: 1,
    maxSize: 1024 * 1024 * 4,
    multiple: false,
  };

  const form = useForm<z.infer<typeof createTeacherSchema>>({
    resolver: zodResolver(createTeacherSchema),
    defaultValues: {
      name: '',
      degree: '',
      major: '',
      departmentId: '',
      avatar: '',
    },
  });

  const { useCreate } = useCrud({ modelName: 'teacher' });
  const { mutate: createTeacher } = useCreate();
  const [departments, setDepartments] = useState<Department[]>([]);

  useEffect(() => {
    async function fetchDepartments() {
      const res = await fetchListData('departments/get-list');
      setDepartments(res.data);
    }
    fetchDepartments();
  }, [departments]);

  function onSubmit(values: z.infer<typeof createTeacherSchema>) {
    try {
      createTeacher(values, {
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
          {t('navigation.sections.add') + ' ' + t('teacher.title').toLowerCase()}
        </span>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="col-span-1 md:col-span-1">
            {/* Other form fields on the left */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>{t('teacher.fields.name.label')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('teacher.fields.name.placeholder')} type="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="degree"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>{t('teacher.fields.degree.label')}</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={t('teacher.fields.degree.placeholder')} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.values(Degree).map((degree) => (
                        <SelectItem key={degree} value={degree}>
                          {t(`enum.degree.${degree.toLowerCase()}`)}
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
              name="major"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>{t('teacher.fields.major.label')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('teacher.fields.major.placeholder')} type="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="departmentId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>{t('teacher.fields.department.label')}</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={t('teacher.fields.department.placeholder')} />
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

          <div className="col-span-1 h-full md:col-span-1">
            {/* File upload field on the right */}
            <FormField
              control={form.control}
              name="avatar"
              render={() => (
                <FormItem className="h-full">
                  <FormLabel>{t('teacher.fields.avatar.label')}</FormLabel>
                  <FormControl>
                    <FileUploader
                      value={files}
                      onValueChange={setFiles}
                      dropzoneOptions={dropZoneConfig}
                      className="relative h-full rounded-lg bg-background p-2"
                    >
                      <FileInput
                        id="fileInput"
                        className="h-full outline-dashed outline-1 outline-slate-500"
                      >
                        <div className="flex h-full w-full flex-col items-center justify-center p-8">
                          <CloudUploadIcon className="size-10 text-gray-500" />
                          <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
                            <span>{t('teacher.fields.avatar.placeholder')}</span>
                          </p>
                        </div>
                      </FileInput>
                      <FileUploaderContent>
                        {files &&
                          files.length > 0 &&
                          files.map((file, i) => (
                            <FileUploaderItem key={i} index={i}>
                              <PaperclipIcon className="size-4 stroke-current" />
                              <span>{file.name}</span>
                            </FileUploaderItem>
                          ))}
                      </FileUploaderContent>
                    </FileUploader>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
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
