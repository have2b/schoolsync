'use client';

import { redirect, useParams } from 'next/navigation';

const AdminPage = () => {
  const params = useParams();
  const locale = (params.locale as string) || 'vi';
  redirect(`/${locale}/student`);
};

export default AdminPage;
