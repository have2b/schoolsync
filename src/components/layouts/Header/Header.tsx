'use client';

import { getAccount, logout } from '@/app/action';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  LangSwitch,
} from '@/components';
import { Account } from '@prisma/client';
import { ChevronDownIcon, DoorOpenIcon, UserIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export const Header = () => {
  const t = useTranslations('header');
  const router = useRouter();
  const params = useParams();
  const [account, setAccount] = useState<Account | null>(null);

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const res = await getAccount();
        setAccount(res);
      } catch (error) {
        console.error('Error fetching account:', error);
      }
    };
    fetchAccount();
  }, []);

  const handleLogout = async () => {
    try {
      const result = await logout();
      if (result) {
        // Access the current locale from params
        const locale = params.locale as string;
        router.push(`/${locale}/login`);
      }
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };
  return (
    <header className="flex w-full items-center justify-end gap-4 border-b-[1px] border-black/20 p-6 shadow-xl">
      <LangSwitch />
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="flex items-center justify-center gap-1">
            <Avatar>
              <AvatarImage src={account?.avatar} />
              <AvatarFallback>AV</AvatarFallback>
            </Avatar>
            <ChevronDownIcon />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <div className="flex items-center justify-center gap-2">
              <UserIcon />
              <span className="font-medium">{t('profile')}</span>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleLogout}>
            <div className="flex items-center justify-center gap-2 text-red-600">
              <DoorOpenIcon />
              <span className="font-medium">{t('logout')}</span>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};
