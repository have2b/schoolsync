'use client';

import {
  LocaleLink,
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
import { usePathname } from 'next/navigation';

export function AppSidebar() {
  const t = useTranslations('navigation');
  const { open } = useSidebar();
  const pathname = usePathname();

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
      return pathSegments[1] === hrefSegments[0];
    }

    // Handle other routes - check if pathname starts with href
    return pathname.startsWith(href);
  };

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
                  <SidebarMenuButton
                    asChild
                    isActive={isActiveLink(link.href)}
                    tooltip={t(link.name)}
                  >
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
