import prisma from '@/prisma';
import argon2 from 'argon2';

const findData = await prisma.account.findMany({});
const passwordHash = await argon2.hash('password');

if (findData.length === 0) {
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
