'use client';

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
import { useAuth } from '@/store/auth';
import { ChevronDownIcon, DoorOpenIcon, UserIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useParams, useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import { toast } from 'sonner';

export const Header = () => {
  const t = useTranslations();
  const memoizedTranslations = useMemo(() => t('auth.status.logoutSuccess'), [t]);

  const router = useRouter();
  const params = useParams();
  const { account, logout } = useAuth();

  const handleLogout = useCallback(async () => {
    try {
      const result = await logout();
      if (result) {
        toast.success(memoizedTranslations);
        const locale = params.locale as string;
        router.push(`/${locale}/login`);
      }
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }, [logout, params.locale, router, memoizedTranslations]);

  return (
    <header className="flex w-full items-center justify-end gap-4 border-b-[1px] border-black/20 p-6 shadow-xl">
      <LangSwitch />
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="flex items-center justify-center gap-1">
            <Avatar>
              <AvatarImage src={account?.avatar || ''} />
              <AvatarFallback>AV</AvatarFallback>
            </Avatar>
            <ChevronDownIcon />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <div className="flex items-center justify-center gap-2">
              <UserIcon />
              <span className="font-medium">{t('header.userMenu.profile')}</span>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleLogout}>
            <div className="flex items-center justify-center gap-2 text-red-600">
              <DoorOpenIcon />
              <span className="font-medium">{t('header.userMenu.logout')}</span>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};
