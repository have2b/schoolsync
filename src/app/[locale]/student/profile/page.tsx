'use client';

import {
  Button,
  Calendar,
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
  Popover,
  PopoverContent,
  PopoverTrigger,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components';

import { useCrud } from '@/hooks';
import { cn } from '@/lib/utils';
import { useAuth } from '@/store/auth';
import { updateStudentProfileSchema } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Gender } from '@prisma/client';
import { format } from 'date-fns';
import { CalendarIcon, CloudUploadIcon, PaperclipIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

const StudentProfile = () => {
  const t = useTranslations();
  const [files, setFiles] = useState<File[] | null>(null);
  const dropZoneConfig = {
    maxFiles: 1,
    maxSize: 1024 * 1024 * 4,
    multiple: false,
  };

  const { account } = useAuth();

  const { useGet, useUpdate } = useCrud({ modelName: 'student' });
  const { data: student } = useGet(account?.id.toString() || '');
  const { mutate: updateStudent } = useUpdate();
  const form = useForm<z.infer<typeof updateStudentProfileSchema>>({
    resolver: zodResolver(updateStudentProfileSchema),
    defaultValues: {
      code: '',
      name: '',
      dob: '' as unknown as Date,
      gender: '',
      address: '',
      phone: '',
      group: '',
      avatar: '',
      department: '',
    },
  });

  useEffect(() => {
    if (student) {
      form.reset({
        code: student.code,
        name: student.name,
        dob: new Date(student.dob),
        gender: student.gender,
        address: student.address,
        phone: student.phone,
        group: student.group.name,
        avatar: student.account.avatar,
        department: student.group.department.name,
      });
    }
  }, [student, form]);

  function onSubmit(values: z.infer<typeof updateStudentProfileSchema>) {
    try {
      const updatedValues = {
        ...values,
        group: Number(values.group),
      };
      updateStudent({ id: String(account?.id), data: updatedValues });
    } catch (error) {
      console.error('Form submission error', error);
      toast.error(t('common.error'));
    }
  }

  if (!student) return <span>Loading...</span>; // Or a loading indicator

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-10 w-full space-y-10 rounded-md bg-white p-10 shadow-xl"
      >
        <span className="text-2xl font-semibold">
          {t('navigation.sections.edit') + ' ' + t('student.title').toLowerCase()}
        </span>
        <div className="grid grid-cols-2 gap-6">
          <div className="col-span-1 space-y-3">
            {/* Other form fields on the left */}
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>{t('student.fields.code.label')}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t('student.fields.code.placeholder')}
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
                  <FormLabel required>{t('student.fields.name.label')}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t('student.fields.name.placeholder')}
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
            <div className="grid grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="dob"
                render={({ field }) => (
                  <FormItem className="flex flex-col justify-end">
                    <FormLabel required>{t('student.fields.dob.label')}</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={'outline'}
                            className={cn(
                              'w-full pl-3 text-left font-normal',
                              !field.value && 'text-muted-foreground'
                            )}
                            disabled
                          >
                            {field.value ? (
                              format(field.value, 'dd/MM/yyyy')
                            ) : (
                              <span>{t('student.fields.dob.placeholder')}</span>
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
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel required>{t('student.fields.gender.label')}</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value} disabled>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={t('student.fields.gender.placeholder')} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.values(Gender).map((gender) => (
                          <SelectItem key={gender} value={gender}>
                            {t(`enum.gender.${gender.toLowerCase()}`)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>{t('student.fields.address.label')}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t('student.fields.address.placeholder')}
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
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>{t('student.fields.phone.label')}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t('student.fields.phone.placeholder')}
                      type="text"
                      {...field}
                      disabled
                      readOnly
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="group"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel required>{t('student.fields.group.label')}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t('student.fields.group.placeholder')}
                        type="text"
                        {...field}
                        disabled
                        readOnly
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="department"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel required>{t('student.fields.department.label')}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t('student.fields.department.placeholder')}
                        type="text"
                        {...field}
                        disabled
                        readOnly
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="col-span-1 h-full md:col-span-1">
            {/* File upload field on the right */}
            <FormField
              control={form.control}
              name="avatar"
              render={() => (
                <FormItem className="h-full">
                  <FormLabel>{t('student.fields.avatar.label')}</FormLabel>
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
                        <div className="flex h-full w-full flex-col items-center justify-center gap-2 p-8">
                          {student?.account.avatar && (
                            <div className="relative size-24 h-full w-full overflow-hidden rounded-xl">
                              <Image
                                src={student.account.avatar}
                                alt="avatar"
                                fill
                                objectFit="contain"
                              />
                            </div>
                          )}
                          <CloudUploadIcon className="size-10 text-gray-500" />
                          <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
                            <span>{t('student.fields.avatar.placeholder')}</span>
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
};

export default StudentProfile;
