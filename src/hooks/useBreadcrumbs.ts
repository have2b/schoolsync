'use client';

import { ADMIN_NAV_LINKS } from '@/constants';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

interface BreadcrumbItemProps {
  href: string;
  label: string;
}

export const useBreadcrumbs = () => {
  const pathname = usePathname();
  const links = ADMIN_NAV_LINKS;

  return useMemo(() => {
    // Split the pathname and get the locale from the first segment
    const segments = pathname.split('/').filter(Boolean);
    const locale = segments[0];

    // Get path segments after locale
    const pathSegments = segments.slice(1);

    const breadcrumbs: BreadcrumbItemProps[] = pathSegments.map((segment, index) => {
      // Build the current path including locale and all segments up to current
      const currentPath = '/' + [locale, ...pathSegments.slice(0, index + 1)].join('/');

      const navItem = links.find((link) => link.href === '/' + segment);

      // If it's a nav item, prepend the locale to its href
      const href = navItem ? `/${locale}${navItem.href}` : currentPath;

      return {
        href,
        label: navItem ? navItem.name : segment,
      };
    });

    return {
      breadcrumbs,
      contentTitle: pathSegments[0] || '',
    };
  }, [pathname, links]);
};
