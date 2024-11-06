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
    const pathSegments = pathname.split('/').filter((_, index) => index > 1);

    const breadcrumbs: BreadcrumbItemProps[] = pathSegments.map((segment, index) => {
      const currentPath = '/' + pathSegments.slice(0, index + 2).join('/');

      const navItem = links.find((link) => link.href === '/' + segment);
      return {
        href: navItem ? navItem.href : currentPath,
        label: navItem ? navItem.name : segment.charAt(0).toUpperCase() + segment.slice(1),
      };
    });

    return {
      breadcrumbs,
      contentTitle: pathSegments[0] || '',
    };
  }, [pathname, links]);
};
