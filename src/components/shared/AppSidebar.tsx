'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from '@/components';
import { ADMIN_NAV_LINKS } from '@/constants';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import LocaleLink from './LocaleLink';

export function AppSidebar() {
  const t = useTranslations('navigation');
  const { open } = useSidebar();
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenuButton asChild>
          <Link className="flex w-full items-center justify-center gap-4 p-8" href={'/'}>
            <div className="relative h-10 w-10">
              <Image src={'/logo.svg'} alt="logo" fill />
            </div>
            <span className={`text-4xl font-bold text-black ${open ? 'block' : 'hidden'}`}>GG</span>
          </Link>
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {ADMIN_NAV_LINKS.map((link) => (
                <SidebarMenuItem key={link.id}>
                  <SidebarMenuButton asChild>
                    <LocaleLink href={link.href}>
                      {link.icon}
                      <span>{t(link.name)}</span>
                    </LocaleLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter className="w-full items-center justify-center">
        <SidebarTrigger />
      </SidebarFooter>
    </Sidebar>
  );
}
