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

    const breadcrumbs: BreadcrumbItemProps[] = pathSegments.reduce((acc, segment, index) => {
      // Skip numeric segments (IDs)
      if (!isNaN(Number(segment))) {
        return acc;
      }

      // Build the current path including locale and previous segments
      const previousSegments = pathSegments.slice(0, index + 1);

      // If the next segment is numeric, don't include it in the href
      const nextSegment = pathSegments[index + 1];
      const isNextSegmentNumeric = !isNaN(Number(nextSegment));

      const currentPath = '/' + [locale, ...previousSegments].join('/');
      const navItem = links.find((link) => link.href === '/' + segment);

      // If it's a nav item, prepend the locale to its href
      let href = navItem ? `/${locale}${navItem.href}` : currentPath;

      // If this is the last non-numeric segment and there's a numeric segment after it,
      // append the numeric segment to maintain the full path
      if (isNextSegmentNumeric) {
        href = `${href}/${nextSegment}`;
      }

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
  }, [pathname, links]);
};
