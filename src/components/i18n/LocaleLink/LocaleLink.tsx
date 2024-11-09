'use client';

import Link, { LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';

interface LocaleLinkProps extends LinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export const LocaleLink = ({ href, children, className, ...props }: LocaleLinkProps) => {
  const locale = usePathname().split('/')[1];

  return (
    <Link href={`/${locale}${href}`} {...props} className={className}>
      {children}
    </Link>
  );
};
