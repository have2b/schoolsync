'use client';

import { fetchListData } from '@/action';
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
import { useCrud } from '@/hooks/useCrud';
import { cn } from '@/lib/utils';
import { createStudentSchema } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Gender, Group } from '@prisma/client';
import { format } from 'date-fns';
import { CalendarIcon, CloudUploadIcon, PaperclipIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

export default function AdminAddStudent() {
  const router = useRouter();
  const t = useTranslations();

  const [files, setFiles] = useState<File[] | null>(null);

  const dropZoneConfig = {
    maxFiles: 1,
    maxSize: 1024 * 1024 * 4,
    multiple: false,
  };

  const form = useForm<z.infer<typeof createStudentSchema>>({
    resolver: zodResolver(createStudentSchema),
    defaultValues: {
      name: '',
      dob: '' as unknown as Date,
      gender: '',
      address: '',
      phone: '',
      groupId: '',
      avatar: '',
    },
  });

  const { useCreate } = useCrud({ modelName: 'student' });
  const { mutate: createStudent } = useCreate();
  const [groups, setGroups] = useState<Group[]>([]);

  useEffect(() => {
    async function fetchData() {
      const [groupsRes] = await Promise.all([fetchListData('groups/get-list')]);
      setGroups(groupsRes.data);
    }
    fetchData();
  }, []);

  function onSubmit(values: z.infer<typeof createStudentSchema>) {
    try {
      const updatedValues = {
        ...values,
        groupId: Number(values.groupId),
      };
      createStudent(updatedValues, {
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
          {t('navigation.sections.add') + ' ' + t('student.title').toLowerCase()}
        </span>
        <div className="grid grid-cols-2 gap-6">
          <div className="col-span-1 space-y-3">
            {/* Other form fields on the left */}
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
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="groupId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>{t('student.fields.group.label')}</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={t('student.fields.group.placeholder')} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {groups?.map(({ id, name }: Group) => (
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
                        <div className="flex h-full w-full flex-col items-center justify-center p-8">
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
          <Button type="button" variant={'destructive'} onClick={() => router.back()}>
            {t('common.actions.cancel')}
          </Button>
          <Button type="submit">{t('common.actions.submit')}</Button>
        </div>
      </form>
    </Form>
  );
}
