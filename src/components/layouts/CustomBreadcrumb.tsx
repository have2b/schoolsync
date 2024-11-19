'use client';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components';
import { useBreadcrumbs } from '@/hooks';
import { useTranslations } from 'next-intl';
import React from 'react';

interface BreadcrumbProps {
  children: React.ReactNode;
  isHidden?: boolean;
}

export const CustomBreadcrumb: React.FC<{ children: React.ReactNode; isHidden?: boolean }> = ({
  children,
  isHidden = false,
}: BreadcrumbProps) => {
  const { breadcrumbs, contentTitle } = useBreadcrumbs();

  const t = useTranslations('navigation');

  if (isHidden) {
    return <>{children}</>;
  }

  return (
    <div className="flex w-full flex-col gap-10 p-10">
      <div className="flex flex-col gap-2">
        <div>
          <span className="relative text-2xl font-semibold underline-offset-2">
            <span className="relative z-10">{t('sections.'.concat(contentTitle))}</span>
            <span className="absolute -bottom-1 left-0 h-1 w-1/3 bg-sidebar-primary-foreground"></span>
          </span>
        </div>
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbs.map((breadcrumb, index) => (
              <React.Fragment key={breadcrumb.href}>
                {index > 0 && <BreadcrumbSeparator />}
                <BreadcrumbItem>
                  {index === breadcrumbs.length - 1 ? (
                    <BreadcrumbPage className="flex items-center gap-2">
                      {t('sections.'.concat(breadcrumb.label))}
                    </BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink href={breadcrumb.href} className="flex items-center gap-2">
                      {t('sections.'.concat(breadcrumb.label))}
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      {children}
    </div>
  );
};
