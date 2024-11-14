'use client';

import { getNavLinks } from '@/lib/utils';
import { useAuth } from '@/store/auth';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

interface BreadcrumbItemProps {
  href: string;
  label: string;
}

export const useBreadcrumbs = () => {
  const pathname = usePathname();
  const { account } = useAuth();

  // Get appropriate nav links based on role
  const navLinks = getNavLinks(account?.role || 'Admin');

  return useMemo(() => {
    // Split the pathname and get the locale from the first segment
    const segments = pathname.split('/').filter(Boolean);
    const locale = segments[0];

    // Include segments after the locale and `/admin`
    const pathSegments = segments.slice(2);

    const breadcrumbs: BreadcrumbItemProps[] = pathSegments.reduce((acc, segment, index) => {
      // Skip numeric segments (IDs)
      if (!isNaN(Number(segment))) {
        return acc;
      }

      // Build the full path up to the current segment
      const currentPath = '/' + [locale, 'admin', ...pathSegments.slice(0, index + 1)].join('/');
      const navItem = navLinks.find((link) => link.href === currentPath);

      // Set href for breadcrumb item
      const href = navItem ? `/${locale}${navItem.href}` : currentPath;

      acc.push({
        href,
        label: navItem ? navItem.name : segment,
      });

      return acc;
    }, [] as BreadcrumbItemProps[]);

    return {
      breadcrumbs,
      contentTitle: pathSegments[0] || '',
    };
  }, [pathname, navLinks]);
};
