import prisma from '@/prisma';
import { faker } from '@faker-js/faker';
import argon2 from 'argon2';

const ACCOUNT_LIMIT = 100;
const DEPARTMENT_LIMIT = 20;
const COURSE_LIMIT = 200;

const getRandomItem = <T>(array: T[]) => array[Math.floor(Math.random() * array.length)];

// Clear existing data (optional, uncomment if needed)
// await prisma.studentCourse.deleteMany();
// await prisma.student.deleteMany();
// await prisma.course.deleteMany();
// await prisma.class.deleteMany();
// await prisma.teacher.deleteMany();
// await prisma.department.deleteMany();
// await prisma.account.deleteMany();

const accountData = await prisma.account.findMany({});
const passwordHash = await argon2.hash('password');

if (accountData.length === 0) {
  // Create admin account
  await prisma.account.create({
    data: {
      username: 'admin',
      email: 'admin@example.com',
      password: passwordHash,
      role: 'Admin',
      avatar: 'https://github.com/have2b.png',
      isFirstLogin: false,
    },
  });

  // Create regular accounts
  const fakeAccounts = Array.from({ length: ACCOUNT_LIMIT }).map(() => ({
    username: faker.internet.username(),
    email: faker.internet.email(),
    password: passwordHash,
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
    isActive: true,
  }));

  await prisma.department.createMany({
    data: fakeDepartments,
  });
}

const teacherData = await prisma.teacher.findMany({});
if (teacherData.length === 0) {
  const teacherAccounts = await prisma.account.findMany({
    where: { role: 'Teacher' },
    select: { id: true },
  });
  const departments = await prisma.department.findMany({ select: { id: true } });

  const fakeTeachers = teacherAccounts.map((account, index) => {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    return {
      code: `GV${(index + 1).toString().padStart(4, '0')}`,
      name: `${firstName} ${lastName}`,
      degree: faker.helpers.arrayElement(['Bachelor', 'Master', 'Phd', 'Assoc', 'Prof']),
      major: faker.person.jobArea(),
      accountId: account.id,
      departmentId: getRandomItem(departments).id,
      isActive: true,
    };
  });

  await prisma.teacher.createMany({
    data: fakeTeachers,
  });
}

const classData = await prisma.class.findMany({});
if (classData.length === 0) {
  const departments = await prisma.department.findMany({ select: { id: true } });
  const teachers = await prisma.teacher.findMany({ select: { id: true } });

  const fakeClasses = Array.from({ length: Math.min(teachers.length - 1, 100) }).map(
    (_, index) => ({
      code: `LHC${(index + 1).toString().padStart(3, '0')}`,
      name: `Class ${index + 1}`,
      capacity: faker.number.int({ min: 30, max: 50 }),
      departmentId: getRandomItem(departments).id,
      teacherId: getRandomItem(teachers).id,
      isActive: true,
    })
  );

  await prisma.class.createMany({
    data: fakeClasses,
  });
}

const studentData = await prisma.student.findMany({});
if (studentData.length === 0) {
  const studentAccounts = await prisma.account.findMany({
    where: { role: 'Student' },
    select: { id: true },
  });
  const departments = await prisma.department.findMany({ select: { id: true } });
  const classes = await prisma.class.findMany({ select: { id: true } });

  const fakeStudents = studentAccounts.map((account, index) => {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    return {
      code: `SV${(index + 1).toString().padStart(4, '0')}`,
      name: `${firstName} ${lastName}`,
      dob: faker.date.birthdate({ min: 18, max: 25, mode: 'age' }),
      gender: faker.helpers.arrayElement(['Male', 'Female', 'Other']),
      address: faker.location.streetAddress(),
      phone: faker.phone.number({ style: 'human' }), // Vietnamese phone format
      accountId: account.id,
      departmentId: getRandomItem(departments).id,
      classId: getRandomItem(classes).id,
      isActive: true,
    };
  });

  await prisma.student.createMany({
    data: fakeStudents,
  });
}

const courseData = await prisma.course.findMany({});
if (courseData.length === 0) {
  const teachers = await prisma.teacher.findMany({ select: { id: true } });

  const fakeCourses = Array.from({ length: COURSE_LIMIT }).map((_, index) => {
    const startDate = faker.date.future();
    return {
      code: `HP${(index + 1).toString().padStart(3, '0')}`,
      name: `Course ${index + 1}`,
      credit: faker.number.int({ min: 1, max: 5 }),
      lesson: faker.number.int({ min: 15, max: 45 }),
      semester: faker.number.int({ min: 1, max: 8 }),
      year: faker.number.int({ min: 2023, max: 2024 }),
      startedAt: startDate,
      endedAt: faker.date.future({ refDate: startDate }),
      teacherId: getRandomItem(teachers).id,
      isActive: true,
    };
  });

  await prisma.course.createMany({
    data: fakeCourses,
  });
}

const studentCourseData = await prisma.studentCourse.findMany({});
if (studentCourseData.length === 0) {
  const students = await prisma.student.findMany({ select: { code: true } });
  const courses = await prisma.course.findMany({ select: { code: true } });

  // Create a more realistic distribution of course enrollments
  const fakeStudentCourses = [];

  // Each student takes 4-8 random courses
  for (const student of students) {
    const numberOfCourses = faker.number.int({ min: 4, max: 8 });
    const selectedCourses = faker.helpers.arrayElements(courses, numberOfCourses);

    for (const course of selectedCourses) {
      fakeStudentCourses.push({
        attendancePoint: faker.number.float({ min: 0, max: 10, multipleOf: 0.25 }),
        midTermPoint: faker.number.float({ min: 0, max: 10, multipleOf: 0.25 }),
        finalPoint: faker.number.float({ min: 0, max: 10, multipleOf: 0.25 }),
        finalGrade: faker.number.float({ min: 0, max: 10, multipleOf: 0.25 }),
        examPoint: faker.number.float({ min: 0, max: 10, multipleOf: 0.25 }),
        studentCode: student.code,
        courseCode: course.code,
      });
    }
  }

  // Insert in batches to handle large datasets
  const batchSize = 200;
  for (let i = 0; i < fakeStudentCourses.length; i += batchSize) {
    const batch = fakeStudentCourses.slice(i, i + batchSize);
    await prisma.studentCourse.createMany({
      data: batch,
    });
  }
}
