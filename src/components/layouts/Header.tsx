'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
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
import {
  ChevronDownIcon,
  CircleXIcon,
  LogOutIcon,
  ShieldPlusIcon,
  SquareUserRoundIcon,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo, useState } from 'react';
import { toast } from 'sonner';
import ChangePasswordDialog from '../common/ChangePasswordDialog';

export const Header = () => {
  const t = useTranslations();
  const memoizedTranslations = useMemo(() => t('auth.status.logoutSuccess'), [t]);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);

  const router = useRouter();
  const { account, logout } = useAuth();

  const handleLogout = useCallback(async () => {
    try {
      const result = await logout();
      if (result) {
        toast.success(memoizedTranslations);
        router.push(`/login`);
      }
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }, [logout, router, memoizedTranslations]);

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
              <SquareUserRoundIcon />
              <span className="font-semibold">{t('header.userMenu.profile')}</span>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsChangePasswordOpen(true)}>
            <div className="flex items-center justify-center gap-2">
              <ShieldPlusIcon />
              <span className="font-semibold">{t('header.userMenu.changePass')}</span>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsLogoutDialogOpen(true)}>
            <div className="flex items-center justify-center gap-2 text-red-600">
              <LogOutIcon />
              <span className="font-semibold">{t('header.userMenu.logout')}</span>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={isLogoutDialogOpen} onOpenChange={setIsLogoutDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <div className="flex items-center justify-center">
              <CircleXIcon className="size-36 text-red-500" />
            </div>
            <AlertDialogTitle>{t('common.confirmation.title')}</AlertDialogTitle>
            <AlertDialogDescription>
              {t('common.confirmation.logoutWarning')}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t('common.actions.cancel')}</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleLogout}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {t('common.confirmation.accept')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <ChangePasswordDialog
        username={account?.username || ''}
        isOpen={isChangePasswordOpen}
        onOpenChange={setIsChangePasswordOpen}
      />
    </header>
  );
};
