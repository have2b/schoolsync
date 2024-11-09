import { Toaster } from '@/components';
import { routing } from '@/i18n/routing';
import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import localFont from 'next/font/local';
import { notFound } from 'next/navigation';
import '../../globals.css';

const robotoFlex = localFont({
  src: '../../fonts/RobotoFlex.ttf',
  variable: '--font-roboto-flex',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'SchoolSync - Auth',
  description: 'School management',
};

// Define an interface for layout props
interface AuthLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function AuthLayout({ children, params }: Readonly<AuthLayoutProps>) {
  const locale = (await params).locale;
  if (!routing.locales.includes(locale as 'en' | 'vi')) {
    notFound();
  }

  const messages = await getMessages();
  return (
    <html lang={locale}>
      <body className={`${robotoFlex.variable} antialiased`}>
        <NextIntlClientProvider messages={messages}>
          {children}
          <Toaster richColors position="top-right" />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
