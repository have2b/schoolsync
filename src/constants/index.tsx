import {
  BookCheckIcon,
  BookOpenIcon,
  GraduationCapIcon,
  NotebookPenIcon,
  SchoolIcon,
  UsersIcon,
} from 'lucide-react';

export const ADMIN_NAV_LINKS = [
  {
    id: 1,
    name: 'students',
    href: '/students',
    icon: <GraduationCapIcon />,
  },
  {
    id: 2,
    name: 'teachers',
    href: '/teachers',
    icon: <UsersIcon />,
  },
  {
    id: 3,
    name: 'departments',
    href: '/departments',
    icon: <SchoolIcon />,
  },
  {
    id: 4,
    name: 'classes',
    href: '/classes',
    icon: <BookOpenIcon />,
  },
  {
    id: 5,
    name: 'courses',
    href: '/courses',
    icon: <BookCheckIcon />,
  },
  {
    id: 6,
    name: 'grades',
    href: '/grades',
    icon: <NotebookPenIcon />,
  },
];
