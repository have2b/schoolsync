import prisma from '@/prisma';
import { faker } from '@faker-js/faker';
import argon2 from 'argon2';

const accountData = await prisma.account.findMany({});
const passwordHash = await argon2.hash('password');

if (accountData.length === 0) {
  await prisma.account.create({
    data: {
      username: 'admin',
      email: 'admin@example.com',
      password: passwordHash,
      name: 'Admin',
      role: 'Admin',
      isFirstLogin: false,
    },
  });
  const fakeAccounts = Array.from({ length: 1000 }).map(() => ({
    username: faker.internet.username(),
    email: faker.internet.email(),
    password: passwordHash,
    name: faker.person.fullName(),
    role: faker.helpers.arrayElement(['Teacher', 'Student']),
    isFirstLogin: faker.datatype.boolean(),
  }));

  await prisma.account.createMany({
    data: fakeAccounts,
  });
}

const departmentData = await prisma.department.findMany({});
if (departmentData.length === 0) {
  const fakeDepartments = Array.from({ length: 1000 }).map((_, index) => ({
    code: `K00${index + 1}`,
    name: `Department ${index + 1}`,
    detail: faker.lorem.sentence(),
  }));

  await prisma.department.createMany({
    data: fakeDepartments,
  });
}
