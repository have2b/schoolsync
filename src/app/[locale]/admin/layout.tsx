import { GeneralLayout } from '@/components';
import { LayoutProtected } from '@/components/layouts/LayoutProtected';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'SchoolSync - Admin',
  description: 'School management',
};

export default function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <LayoutProtected allowedRoles={['Admin']}>
      <GeneralLayout>{children}</GeneralLayout>
    </LayoutProtected>
  );
}
