import { routing } from '@/i18n/routing';
import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import localFont from 'next/font/local';
import { notFound } from 'next/navigation';
import '../../globals.css';

const kumbhSans = localFont({
  src: '../../fonts/KumbhSans.ttf',
  variable: '--font-kumbh-sans',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'SchoolSync',
  description: 'School management',
};

// Define an interface for layout props
interface MainLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function MainLayout({ children, params }: Readonly<MainLayoutProps>) {
  const locale = (await params).locale;
  if (!routing.locales.includes(locale as 'en' | 'vi')) {
    notFound();
  }

  const messages = await getMessages();
  return (
    <html lang={locale}>
      <body className={`${kumbhSans.variable} antialiased`}>
        <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
