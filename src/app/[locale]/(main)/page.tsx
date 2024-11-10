'use client';

import { getAccount } from '@/app/action';
import { Account } from '@prisma/client';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Home() {
  const router = useRouter();
  const params = useParams();
  const [account, setAccount] = useState<Account | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const res = await getAccount();
        setAccount(res);
      } catch (error) {
        console.error('Error fetching account:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchAccount();
  }, []);

  useEffect(() => {
    if (!loading && account) {
      async function gotoDashboard() {
        const locale = (params.locale as string) || 'vi';
        switch (account?.role) {
          case 'Admin':
            router.push(`/${locale}/student`);
            break;
          default:
            router.push(`/${locale}/grade`);
        }
      }
      gotoDashboard();
    }
  }, [loading, account, params, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return null;
}
