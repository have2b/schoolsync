import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components';
import { ChevronDownIcon, DoorOpenIcon, UserIcon } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { LangSwitch } from './LangSwitch';

export const Header = async () => {
  const t = await getTranslations('header');
  return (
    <header className="flex w-full items-center justify-end gap-4 p-6 shadow-md">
      <LangSwitch />
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="flex items-center justify-center gap-1">
            <Avatar>
              <AvatarImage src="https://github.com/have2b.png" />
              <AvatarFallback>AV</AvatarFallback>
            </Avatar>
            <ChevronDownIcon className="size-5" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <div className="flex items-center justify-center gap-2">
              <UserIcon className="size-5" />
              <span className="font-medium">{t('profile')}</span>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <div className="flex items-center justify-center gap-2 text-red-600">
              <DoorOpenIcon className="size-5" />
              <span className="font-medium">{t('logout')}</span>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};
