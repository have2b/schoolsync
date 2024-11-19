import {
  BackpackIcon,
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
    name: 'group',
    href: '/group',
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
    name: 'roster',
    href: '/roster',
    icon: <BackpackIcon />,
  },
  {
    id: 7,
    name: 'grade',
    href: '/grade',
    icon: <NotebookPenIcon />,
  },
];

export const TEACHER_NAV_LINKS = [
  {
    id: 1,
    name: 'roster',
    href: '/roster',
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
    name: 'result',
    href: '/result',
    icon: <NotebookPenIcon />,
  },
  {
    id: 2,
    name: 'roster',
    href: '/roster',
    icon: <BookCheckIcon />,
  },
];
