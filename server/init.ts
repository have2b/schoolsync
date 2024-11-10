import prisma from '@/prisma';
import { faker } from '@faker-js/faker';
import argon2 from 'argon2';

const accountData = await prisma.account.findMany({});
const passwordHash = await argon2.hash('password');

const ACCOUNT_LIMIT = 1000;
const DEPARTMENT_LIMIT = 500;
const COURSE_LIMIT = 1000;

const getRandomItem = <T>(array: T[]) => array[Math.floor(Math.random() * array.length)];
if (accountData.length === 0) {
  await prisma.account.create({
    data: {
      username: 'admin',
      email: 'admin@example.com',
      password: passwordHash,
      name: 'Admin',
      role: 'Admin',
      avatar: 'https://github.com/have2b.png',
      isFirstLogin: false,
    },
  });
  const fakeAccounts = Array.from({ length: ACCOUNT_LIMIT }).map(() => ({
    username: faker.internet.username(),
    email: faker.internet.email(),
    password: passwordHash,
    name: faker.person.fullName(),
    role: faker.helpers.arrayElement(['Teacher', 'Student']),
    avatar: faker.image.avatarGitHub(),
    isFirstLogin: faker.datatype.boolean(),
  }));

  await prisma.account.createMany({
    data: fakeAccounts,
  });
}

const departmentData = await prisma.department.findMany({});
if (departmentData.length === 0) {
  const fakeDepartments = Array.from({ length: DEPARTMENT_LIMIT }).map((_, index) => ({
    code: `K${(index + 1).toString().padStart(3, '0')}`,
    name: `Department ${index + 1}`,
    detail: faker.lorem.sentence(),
  }));

  await prisma.department.createMany({
    data: fakeDepartments,
  });
}

const teacherData = await prisma.teacher.findMany({});
if (teacherData.length === 0) {
  // Fetch all accounts with the role of 'Teacher'
  const teacherAccounts = await prisma.account.findMany({
    where: {
      role: 'Teacher',
    },
    select: {
      id: true,
    },
  });

  const fakeTeachers = Array.from({ length: teacherAccounts.length }).map((_, index) => ({
    code: `GV${(index + 1).toString().padStart(4, '0')}`,
    degree: faker.helpers.arrayElement(['Bachelor', 'Master', 'Phd', 'Assoc', 'Prof']),
    major: faker.lorem.word(),
    accountId: teacherAccounts[index].id, // Use the account ID from the fetched teacher accounts
  }));

  await prisma.teacher.createMany({
    data: fakeTeachers,
  });
}

const classData = await prisma.class.findMany({});
if (classData.length === 0) {
  const departmentData = await prisma.department.findMany({ select: { id: true } });
  const teacherData = await prisma.teacher.findMany({ select: { id: true } });

  const fakeClasses = Array.from({ length: teacherData.length - 1 }).map((_, index) => ({
    code: `LHC${(index + 1).toString().padStart(3, '0')}`,
    name: `Class ${index + 1}`,
    capacity: faker.number.int({ min: 30, max: 50 }),
    departmentId: getRandomItem(departmentData).id,
    teacherId: getRandomItem(teacherData).id,
  }));

  await prisma.class.createMany({
    data: fakeClasses,
  });
}

const studentData = await prisma.student.findMany({});
if (studentData.length === 0) {
  // Fetch all accounts with the role of 'Student'
  const studentAccounts = await prisma.account.findMany({
    where: {
      role: 'Student',
    },
    select: {
      id: true,
    },
  });
  const departmentData = await prisma.department.findMany({ select: { id: true } });
  const classData = await prisma.class.findMany({
    select: {
      id: true,
    },
  });

  const fakeStudents = Array.from({ length: studentAccounts.length }).map((_, index) => ({
    code: `SV${(index + 1).toString().padStart(4, '0')}`,
    dob: faker.date.birthdate(),
    gender: faker.helpers.arrayElement(['Male', 'Female', 'Other']),
    address: faker.location.streetAddress(),
    phone: faker.phone.number({ style: 'international' }),
    accountId: studentAccounts[index].id,
    departmentId: getRandomItem(departmentData).id,
    classId: getRandomItem(classData).id,
  }));

  await prisma.student.createMany({
    data: fakeStudents,
  });
}

const courseData = await prisma.course.findMany({});
if (courseData.length === 0) {
  const teacherData = await prisma.teacher.findMany({ select: { id: true } });

  const fakeCourses = Array.from({ length: COURSE_LIMIT }).map((_, index) => ({
    code: `LHP${(index + 1).toString().padStart(3, '0')}`,
    name: `Course ${index + 1}`,
    credit: faker.number.int({ min: 1, max: 5 }),
    lesson: faker.number.int({ min: 1, max: 10 }),
    semester: faker.number.int({ min: 1, max: 9 }),
    year: faker.number.int({ min: 2000, max: 2024 }),
    startedAt: faker.date.past(),
    endedAt: faker.date.future(),

    teacherId: getRandomItem(teacherData).id,
  }));

  await prisma.course.createMany({
    data: fakeCourses,
  });
}

const studentCourseData = await prisma.studentCourse.findMany({});
if (studentCourseData.length === 0) {
  const studentData = await prisma.student.findMany({ select: { code: true } });
  const courseData = await prisma.course.findMany({ select: { code: true } });

  const fakeStudentCourses = Array.from({ length: studentData.length - 1 }).map(() => ({
    attendancePoint: faker.number.float({ multipleOf: 0.25, min: 0, max: 10 }),
    midTermPoint: faker.number.float({ multipleOf: 0.25, min: 0, max: 10 }),
    finalPoint: faker.number.float({ multipleOf: 0.25, min: 0, max: 10 }),
    finalGrade: faker.number.float({ multipleOf: 0.25, min: 0, max: 10 }),
    examPoint: faker.number.float({ multipleOf: 0.25, min: 0, max: 10 }),

    studentCode: getRandomItem(studentData).code,
    courseCode: getRandomItem(courseData).code,
  }));

  await prisma.studentCourse.createMany({
    data: fakeStudentCourses,
  });
}
