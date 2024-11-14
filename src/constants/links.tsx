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
    name: 'student',
    href: '/student',
    icon: <GraduationCapIcon />,
  },
  {
    id: 2,
    name: 'teacher',
    href: '/teacher',
    icon: <UsersIcon />,
  },
  {
    id: 3,
    name: 'department',
    href: '/department',
    icon: <SchoolIcon />,
  },
  {
    id: 4,
    name: 'class',
    href: '/class',
    icon: <BookOpenIcon />,
  },
  {
    id: 5,
    name: 'course',
    href: '/course',
    icon: <BookCheckIcon />,
  },
  {
    id: 6,
    name: 'grade',
    href: '/grade',
    icon: <NotebookPenIcon />,
  },
];

export const TEACHER_NAV_LINKS = [
  {
    id: 1,
    name: 'course',
    href: '/course',
    icon: <BookCheckIcon />,
  },
  {
    id: 2,
    name: 'student',
    href: '/student',
    icon: <GraduationCapIcon />,
  },
  {
    id: 3,
    name: 'grade',
    href: '/grade',
    icon: <NotebookPenIcon />,
  },
];

export const STUDENT_NAV_LINKS = [
  {
    id: 1,
    name: 'grade',
    href: '/grade',
    icon: <NotebookPenIcon />,
  },
  {
    id: 2,
    name: 'course',
    href: '/course',
    icon: <BookCheckIcon />,
  },
];
