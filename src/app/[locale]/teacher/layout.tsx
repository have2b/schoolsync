import { GeneralLayout } from '@/components';
import { LayoutProtected } from '@/components/layouts/LayoutProtected';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'SchoolSync - Teacher',
  description: 'School management',
};

export default function TeacherLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <LayoutProtected allowedRoles={['Teacher']}>
      <GeneralLayout>{children}</GeneralLayout>
    </LayoutProtected>
  );
}
