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
import { useAuth } from '@/store/auth';
import { loginSchema } from '@/types';
import { useMutation } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { Suspense } from 'react';
import { toast } from 'sonner';
import LoadingSkeleton from './loading';

export default function LoginPage() {
  const { login } = useAuth();
  const params = useParams();
  const router = useRouter();
  const t = useTranslations('auth');
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const useLogin = () => {
    return useMutation({
      mutationFn: async (values: z.infer<typeof loginSchema>) => {
        const response = await api.post('/auth/login', values);

        // Check if response is not successful
        if (response.data.status !== 200) {
          throw new Error(response.data.message);
        }

        return response.data;
      },
      onMutate: () => {
        // Show loading toast when mutation starts
        toast.loading(t('status.loggingIn'));
      },
      onSuccess: async (data) => {
        // Clear loading toast and show success
        toast.dismiss();
        login(data.data); // Call login function with the data
        toast.success(t('status.' + data.message));

        const locale = ((await params).locale as string) || 'vi';
        router.push(`/${locale}`);
      },
      onError: (error: Error) => {
        // Clear loading toast and show error
        toast.dismiss();
        toast.error(t('status.' + error.message));
      },
    });
  };

  const loginMutation = useLogin();

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    loginMutation.mutate(values);
  }

  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <div className="relative grid min-h-screen grid-cols-2">
        <div className="absolute right-4 top-4 z-10">
          <LangSwitch />
        </div>
        {/* Left side with image and welcome text */}
        <div className="relative bg-orange-400/80">
          <Image
            src="/bg.jpg"
            alt="School Building"
            fill
            className="object-cover mix-blend-multiply"
            priority
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <Image src={'/logo.png'} alt="School Logo" width={200} height={200} className="mb-6" />
            <h1 className="text-6xl font-bold text-white">WELCOME</h1>
          </div>
        </div>
        <div className="flex items-center justify-center bg-blue-900 p-8">
          <div className="w-full max-w-md rounded-lg bg-white p-8">
            <h2 className="mb-6 text-center text-2xl font-bold uppercase text-blue-900">
              {t('actions.login')}
            </h2>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel required>{t('fields.username.label')}</FormLabel>
                      <FormControl>
                        <Input placeholder={t('fields.username.placeholder')} {...field} />
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
                      <FormLabel required>{t('fields.password.label')}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t('fields.password.placeholder')}
                          {...field}
                          type="password"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  {t('actions.login')}
                </Button>
              </form>
            </Form>

            <div className="mt-8 text-center text-sm text-gray-500">
              © 2024 SchoolSync - School Management
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
}
