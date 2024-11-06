'use client';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  ContentTitle,
} from '@/components';
import { useBreadcrumbs } from '@/hooks/useBreadcrumbs';
import { useTranslations } from 'next-intl';
import React from 'react';

export const ContentLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { breadcrumbs, contentTitle } = useBreadcrumbs();
  const t = useTranslations('navigation');

  return (
    <div className="flex w-full flex-col p-10">
      <ContentTitle title={t(contentTitle)} />
      <Breadcrumb>
        <BreadcrumbList>
          {breadcrumbs.map((breadcrumb, index) => (
            <React.Fragment key={breadcrumb.href}>
              {index > 0 && <BreadcrumbSeparator />}
              <BreadcrumbItem>
                {index === breadcrumbs.length - 1 ? (
                  <BreadcrumbPage className="flex items-center gap-2">
                    {t(breadcrumb.label)}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={breadcrumb.href} className="flex items-center gap-2">
                    {t(breadcrumb.label)}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
      {children}
    </div>
  );
};
