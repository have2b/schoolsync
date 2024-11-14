import { GeneralLayout } from '@/components';
import { LayoutProtected } from '@/components/layouts/LayoutProtected';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'SchoolSync - Student',
  description: 'School management',
};

export default function StudentLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <LayoutProtected allowedRoles={['Student']}>
      <GeneralLayout>{children}</GeneralLayout>
    </LayoutProtected>
  );
}
