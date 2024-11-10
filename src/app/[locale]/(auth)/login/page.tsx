'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  LangSwitch,
} from '@/components';
import api from '@/lib/api';
import { loginSchema } from '@/types';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { redirect, useParams } from 'next/navigation';
import { toast } from 'sonner';

export default function Login() {
  const params = useParams();
  const t = useTranslations('auth');
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    const res = await api.post('/auth/login', values);

    if (res.data.status === 200) {
      toast.success(t(res.data.message));
      const locale = (params.locale as string) || 'vi';

      setTimeout(() => {
        redirect(`/${locale}`);
      }, 500);
    } else {
      toast.error(t(res.data.message));
    }
  }

  return (
    <div className="relative grid min-h-screen grid-cols-2">
      <div className="absolute right-4 top-4 z-10">
        <LangSwitch />
      </div>
      {/* Left side with image and welcome text */}
      <div className="relative bg-orange-400/80">
        <Image
          src="/bg.jpg" // Add your school building image
          alt="School Building"
          fill
          className="object-cover mix-blend-multiply"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <Image src={'/logo.png'} alt="School Logo" width={200} height={200} className="mb-6" />
          <h1 className="text-6xl font-bold text-white">WELCOME</h1>
        </div>
      </div>
      <div className="flex items-center justify-center bg-blue-900 p-8">
        <div className="w-full max-w-md rounded-lg bg-white p-8">
          <h2 className="mb-6 text-center text-2xl font-bold uppercase text-blue-900">
            {t('login')}
          </h2>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel required>{t('username')}</FormLabel>
                    <FormControl>
                      <Input placeholder={t('usernamePlaceholder')} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel required>{t('password')}</FormLabel>
                    <FormControl>
                      <Input placeholder={t('passwordPlaceholder')} {...field} type="password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                {t('login')}
              </Button>
            </form>
          </Form>

          <div className="mt-8 text-center text-sm text-gray-500">
            © 2024 SchoolSync - School Management
          </div>
        </div>
      </div>
    </div>
  );
}
