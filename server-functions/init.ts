import prisma from '@/prisma';
import argon2 from 'argon2';

const accountData = await prisma.account.findMany({});
const passwordHash = await argon2.hash('password');

if (accountData.length === 0) {
  await prisma.account.createMany({
    data: [
      {
        username: 'admin',
        email: 'admin@example.com',
        password: passwordHash,
        name: 'Admin',
        role: 'Admin',
        isFirstLogin: false,
      },
      {
        username: 'teacher',
        email: 'teacher@example.com',
        password: passwordHash,
        name: 'Teacher',
        role: 'Teacher',
        isFirstLogin: false,
      },
      {
        username: 'student',
        email: 'student@example.com',
        password: passwordHash,
        name: 'Student',
        role: 'Student',
        isFirstLogin: false,
      },
    ],
  });
}

const departmentData = await prisma.department.findMany({});
if (departmentData.length === 0) {
  await prisma.department.createMany({
    data: [
      {
        departmentCode: 'K001',
        name: 'Department 1',
        detail: 'Department 1 detail',
      },
      {
        departmentCode: 'K002',
        name: 'Department 2',
        detail: 'Department 2 detail',
      },
      {
        departmentCode: 'K003',
        name: 'Department 3',
        detail: 'Department 3 detail',
      },
    ],
  });
}
