import { ADMIN_NAV_LINKS, STUDENT_NAV_LINKS, TEACHER_NAV_LINKS } from '@/constants';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getNavLinks = (role: string) => {
  switch (role) {
    case 'Admin':
      return ADMIN_NAV_LINKS;
    case 'Teacher':
      return TEACHER_NAV_LINKS;
    case 'Student':
      return STUDENT_NAV_LINKS;
    default:
      return [];
  }
};
