import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components';
import { BellIcon, ChevronDownIcon, DoorOpenIcon, MailIcon, UserIcon } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { LangSwitch } from './LangSwitch';

export const Header = async () => {
  const t = await getTranslations('Header');
  return (
    <header className="flex w-full items-center justify-end gap-2 p-4 shadow-md">
      <LangSwitch />
      <div className="me-4 flex items-center justify-center gap-3 border-e-2 border-black px-4 py-1">
        <MailIcon className="size-5" />
        <BellIcon className="size-5" />
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="flex items-center justify-center gap-1">
            <Avatar>
              <AvatarImage src="https://github.com/have2b.png" />
              <AvatarFallback>AV</AvatarFallback>
            </Avatar>
            <ChevronDownIcon className="h-4 w-4" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <div className="flex items-center justify-center gap-2">
              <UserIcon className="h-4 w-4" />
              <span className="font-medium">{t('profile')}</span>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <div className="flex items-center justify-center gap-2 text-red-600">
              <DoorOpenIcon className="h-4 w-4" />
              <span className="font-medium">{t('logout')}</span>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};
