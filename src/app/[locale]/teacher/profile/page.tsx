'use client';

import {
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
} from '@/components';

import { useCrud } from '@/hooks';
import { useAuth } from '@/store/auth';
import { updateTeacherProfileSchema } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { CloudUploadIcon, PaperclipIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

const TeacherProfile = () => {
  const t = useTranslations();
  const [files, setFiles] = useState<File[] | null>(null);
  const dropZoneConfig = {
    maxFiles: 1,
    maxSize: 1024 * 1024 * 4,
    multiple: false,
  };

  const { account } = useAuth();

  const { useGet, useUpdate } = useCrud({ modelName: 'teacher' });
  const { data: teacher } = useGet(account?.id.toString() || '');
  const { mutate: updateTeacher } = useUpdate();
  const form = useForm<z.infer<typeof updateTeacherProfileSchema>>({
    resolver: zodResolver(updateTeacherProfileSchema),
    defaultValues: {
      code: '',
      name: '',
      email: '',
      degree: '',
      major: '',
      avatar: '',
    },
  });

  useEffect(() => {
    if (teacher) {
      form.reset({
        code: teacher.code,
        name: teacher.name,
        email: teacher.account.email,
        degree: t('enum.degree.' + teacher.degree.toLowerCase()),
        major: teacher.major,
        avatar: teacher.account.avatar,
      });
    }
  }, [teacher, form, t]);

  function onSubmit(values: z.infer<typeof updateTeacherProfileSchema>) {
    try {
      const updatedValues = {
        ...values,
      };
      updateTeacher({ id: String(account?.id), data: updatedValues });
    } catch (error) {
      console.error('Form submission error', error);
      toast.error(t('common.error'));
    }
  }

  if (!teacher) return <span>Loading...</span>; // Or a loading indicator

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-10 w-full space-y-10 rounded-md bg-white p-10 shadow-xl"
      >
        <span className="text-2xl font-semibold">{teacher?.name}</span>
        <div className="grid grid-cols-2 gap-6">
          <div className="col-span-1 space-y-3">
            {/* Other form fields on the left */}
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>{t('teacher.fields.code.label')}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t('teacher.fields.code.placeholder')}
                      type="text"
                      {...field}
                      readOnly
                      disabled
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
                <FormItem>
                  <FormLabel required>{t('teacher.fields.name.label')}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t('teacher.fields.name.placeholder')}
                      type="text"
                      {...field}
                      readOnly
                      disabled
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>{t('teacher.fields.email.label')}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t('teacher.fields.email.placeholder')}
                      type="text"
                      {...field}
                      readOnly
                      disabled
                    />
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
                  <FormControl>
                    <Input
                      placeholder={t('teacher.fields.degree.placeholder')}
                      type="text"
                      {...field}
                      readOnly
                      disabled
                    />
                  </FormControl>
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
                    <Input
                      placeholder={t('teacher.fields.major.placeholder')}
                      type="text"
                      {...field}
                      readOnly
                      disabled
                    />
                  </FormControl>
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
                          <div className="relative size-32">
                            <Image
                              src={teacher.account.avatar}
                              alt="avatar"
                              fill
                              className="rounded-full object-contain"
                            />
                          </div>
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
      </form>
    </Form>
  );
};

export default TeacherProfile;
