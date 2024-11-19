'use client';

import {
  LocaleLink,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from '@/components';
import { getNavLinks } from '@/lib/utils';
import { useAuth } from '@/store/auth';
import { UserSquare2Icon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function AppSidebar() {
  const t = useTranslations('navigation.sections');
  const pathname = usePathname();
  const { account } = useAuth();

  const navLinks = getNavLinks(account?.role || 'Admin');

  // Function to check if the current path matches the menu item's href
  const isActiveLink = (href: string) => {
    const pathSegments = pathname.split('/').filter(Boolean); // Split path and remove empty segments
    const hrefSegments = href.split('/').filter(Boolean); // Split href and remove empty segments

    // Handle exact match for homepage
    if (href === '/') {
      return pathname === '/';
    }

    // Check if the second segment of the pathname matches the second segment of the href
    if (pathSegments.length > 1 && hrefSegments.length > 0) {
      return pathSegments[2] === hrefSegments[0];
    }

    // Handle other routes - check if pathname starts with href
    return pathname.startsWith(href);
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenuButton asChild className="p-8 hover:bg-secondary">
          <Link className="flex w-full items-center justify-center" href={'/'}>
            <div className="relative size-20">
              <Image src={'/logo.svg'} alt="logo" fill />
            </div>
          </Link>
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          {account?.role !== 'Admin' && (
            <>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    isActive={isActiveLink('profile')}
                    tooltip={t('profile')}
                  >
                    <LocaleLink
                      href={'/'.concat(account?.role.toLowerCase().concat('/profile') ?? '/vi')}
                      className="h-full py-3"
                    >
                      <UserSquare2Icon className="size-4" />
                      <span>{t('profile')}</span>
                    </LocaleLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
              <SidebarGroupLabel className="text-base font-semibold text-white">
                {t('researchInfo')}
              </SidebarGroupLabel>
            </>
          )}
          <SidebarGroupContent>
            <SidebarMenu>
              {navLinks.map((link) => (
                <SidebarMenuItem key={link.id}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActiveLink(link.href)}
                    tooltip={
                      account?.role === 'Student'
                        ? t(account.role.toLowerCase().concat('Role.', link.name))
                        : t(link.name)
                    }
                  >
                    <LocaleLink
                      href={'/'.concat(account?.role.toLowerCase().concat(link.href) ?? '/vi')}
                      className="h-full py-3"
                    >
                      {link.icon}
                      {account?.role === 'Student' ? (
                        <span>{t(account.role.toLowerCase().concat('Role.', link.name))}</span>
                      ) : (
                        <span>{t(link.name)}</span>
                      )}
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
