import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

const kumbhSans = localFont({
  src: './fonts/KumbhSans.ttf',
  variable: '--font-kumbh-sans',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'SchoolSync',
  description: 'School management',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${kumbhSans.variable} antialiased`}>{children}</body>
    </html>
  );
}
