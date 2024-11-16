import prisma from '@/prisma';
import { faker } from '@faker-js/faker';
import argon2 from 'argon2';

const ACCOUNT_LIMIT = process.env.ACCOUNT_LIMIT ? parseInt(process.env.ACCOUNT_LIMIT) : 100;
const DEPARTMENT_LIMIT = process.env.DEPARTMENT_LIMIT ? parseInt(process.env.DEPARTMENT_LIMIT) : 10;
const COURSE_LIMIT = process.env.COURSE_LIMIT ? parseInt(process.env.COURSE_LIMIT) : 100;

const getRandomItem = <T>(array: T[]) => array[Math.floor(Math.random() * array.length)];

// Helper function to generate sequential codes
const generateSequentialCode = async (prefix: string, startIndex: number, length: number) => {
  return `${prefix}${startIndex.toString().padStart(length, '0')}`;
};

// Helper function to generate unique email
const generateUniqueEmail = async () => {
  let email: string;
  let exists: boolean;
  do {
    email = faker.internet
      .email()
      .toLowerCase()
      .concat(faker.number.int({ min: 1, max: 99999 }).toString());
    exists = (await prisma.account.findUnique({ where: { email } })) !== null;
  } while (exists);
  return email;
};

// Helper function to generate unique username
const generateUniqueUsername = async () => {
  let username: string;
  let exists: boolean;
  do {
    username = faker.internet
      .username()
      .toLowerCase()
      .concat(faker.number.int({ min: 1, max: 99999 }).toString());
    exists = (await prisma.account.findUnique({ where: { username } })) !== null;
  } while (exists);
  return username;
};

const passwordHash = await argon2.hash('password');

// Create accounts with unique emails and usernames
const createAccounts = async () => {
  const accountCount = await prisma.account.count();
  if (accountCount === 0) {
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

    // Create regular accounts in batches to prevent memory issues
    const batchSize = 100;
    for (let i = 0; i < ACCOUNT_LIMIT; i += batchSize) {
      const batchAccounts = await Promise.all(
        Array.from({ length: Math.min(batchSize, ACCOUNT_LIMIT - i) }).map(async () => ({
          username: await generateUniqueUsername(),
          email: await generateUniqueEmail(),
          password: passwordHash,
          role: faker.helpers.arrayElement(['Teacher', 'Student']),
          avatar: faker.image.avatarGitHub(),
          isFirstLogin: faker.datatype.boolean(),
        }))
      );

      await prisma.account.createMany({
        data: batchAccounts,
      });
    }
  }
};

// Create departments with unique codes
const createDepartments = async () => {
  const departmentCount = await prisma.department.count();
  if (departmentCount === 0) {
    const departments = Array.from({ length: DEPARTMENT_LIMIT }).map((_, index) => ({
      code: `K${(index + 1).toString().padStart(3, '0')}`,
      name: faker.company.name(),
      detail: faker.lorem.sentence(),
      isActive: faker.datatype.boolean(),
    }));

    await prisma.department.createMany({
      data: departments,
    });
  }
};

// Create teachers with unique codes
const createTeachers = async () => {
  const teacherCount = await prisma.teacher.count();
  if (teacherCount === 0) {
    const teacherAccounts = await prisma.account.findMany({
      where: { role: 'Teacher' },
      select: { id: true },
    });
    const departments = await prisma.department.findMany({ select: { id: true } });

    const teachers = await Promise.all(
      teacherAccounts.map(async (account, index) => ({
        code: await generateSequentialCode('GV', index + 1, 5),
        name: `${faker.person.firstName()} ${faker.person.lastName()}`,
        degree: faker.helpers.arrayElement(['Bachelor', 'Master', 'Phd', 'Assoc', 'Prof']),
        major: faker.person.jobArea(),
        accountId: account.id,
        departmentId: getRandomItem(departments).id,
      }))
    );

    // Insert in batches to prevent memory issues
    const batchSize = 100;
    for (let i = 0; i < teachers.length; i += batchSize) {
      const batch = teachers.slice(i, i + batchSize);
      await prisma.teacher.createMany({
        data: batch,
      });
    }
  }
};

// Create groups with unique codes
const createGroups = async () => {
  const groupCount = await prisma.group.count();
  if (groupCount === 0) {
    const departments = await prisma.department.findMany({ select: { id: true } });
    const teachers = await prisma.teacher.findMany({ select: { id: true } });

    const groups = Array.from({ length: Math.min(teachers.length - 1, 100) }).map((_, index) => ({
      code: `LHC${(index + 1).toString().padStart(4, '0')}`,
      name: `Class ${index + 1}`,
      capacity: faker.number.int({ min: 30, max: 50 }),
      departmentId: getRandomItem(departments).id,
      teacherId: getRandomItem(teachers).id,
    }));

    await prisma.group.createMany({
      data: groups,
    });
  }
};

const createStudents = async () => {
  const studentCount = await prisma.student.count();
  if (studentCount === 0) {
    const studentAccounts = await prisma.account.findMany({
      where: { role: 'Student' },
      select: { id: true },
    });
    const groups = await prisma.group.findMany({ select: { id: true } });

    const students = studentAccounts.map((account, index) => ({
      code: `SV${(index + 1).toString().padStart(5, '0')}`,
      name: `${faker.person.firstName()} ${faker.person.lastName()}`,
      dob: faker.date.birthdate({ min: 18, max: 25, mode: 'age' }),
      gender: faker.helpers.arrayElement(['Male', 'Female', 'Other']),
      address: faker.location.streetAddress(),
      phone: faker.phone.number(),
      accountId: account.id,
      groupId: getRandomItem(groups).id,
    }));

    // Insert in batches
    const batchSize = 100;
    for (let i = 0; i < students.length; i += batchSize) {
      const batch = students.slice(i, i + batchSize);
      await prisma.student.createMany({
        data: batch,
      });
    }
  }
};

const createCourses = async () => {
  const courseCount = await prisma.course.count();
  if (courseCount === 0) {
    const courses = Array.from({ length: COURSE_LIMIT }).map((_, index) => ({
      code: `HP${(index + 1).toString().padStart(3, '0')}`,
      name: faker.book.title().concat(faker.number.int({ min: 1, max: 99999 }).toString()),
      credit: faker.number.int({ min: 1, max: 5 }),
      lesson: faker.number.int({ min: 15, max: 45 }),
    }));

    await prisma.course.createMany({
      data: courses,
    });
  }
};

const createRosters = async () => {
  const rosterCount = await prisma.roster.count();
  if (rosterCount === 0) {
    const courses = await prisma.course.findMany({ select: { id: true, name: true } });
    const teachers = await prisma.teacher.findMany({ select: { id: true } });

    const rosters = Array.from({ length: COURSE_LIMIT * 2 }).map((_, index) => {
      const startDate = faker.date.future();
      const courseItem = getRandomItem(courses);
      return {
        code: `LHP${(index + 1).toString().padStart(4, '0')}`,
        name: courseItem.name,
        capacity: faker.number.int({ min: 30, max: 50 }),
        semester: faker.number.int({ min: 1, max: 9 }),
        year: faker.number.int({ min: 2020, max: 2024 }),
        startDate,
        endDate: faker.date.future({ refDate: startDate }),
        courseId: courseItem.id,
        teacherId: getRandomItem(teachers).id,
      };
    });

    // Insert in batches
    const batchSize = 100;
    for (let i = 0; i < rosters.length; i += batchSize) {
      const batch = rosters.slice(i, i + batchSize);
      await prisma.roster.createMany({
        data: batch,
      });
    }
  }
};

// Create grades with unique student-roster combinations
const createGrades = async () => {
  const gradeCount = await prisma.grade.count();
  if (gradeCount === 0) {
    const students = await prisma.student.findMany({ select: { code: true } });
    const rosters = await prisma.roster.findMany({ select: { code: true } });

    const grades = [];
    const studentRosterPairs = new Set();

    // Each student takes 4-8 random rosters
    for (const student of students) {
      const numberOfRosters = faker.number.int({ min: 4, max: 8 });
      const selectedRosters = faker.helpers.arrayElements(rosters, numberOfRosters);

      for (const roster of selectedRosters) {
        const pairKey = `${student.code}-${roster.code}`;
        if (!studentRosterPairs.has(pairKey)) {
          studentRosterPairs.add(pairKey);
          grades.push({
            attendancePoint: faker.number.float({ min: 0, max: 10, multipleOf: 0.25 }),
            midTermPoint: faker.number.float({ min: 0, max: 10, multipleOf: 0.25 }),
            finalPoint: faker.number.float({ min: 0, max: 10, multipleOf: 0.25 }),
            finalGrade: faker.number.float({ min: 0, max: 10, multipleOf: 0.25 }),
            examPoint: faker.number.float({ min: 0, max: 10, multipleOf: 0.25 }),
            studentCode: student.code,
            rosterCode: roster.code,
          });
        }
      }
    }

    // Insert in batches to handle large datasets
    const batchSize = 100;
    for (let i = 0; i < grades.length; i += batchSize) {
      const batch = grades.slice(i, i + batchSize);
      await prisma.grade.createMany({
        data: batch,
      });
    }
  }
};

// Main seeding function
const seed = async () => {
  try {
    await createAccounts();
    await createDepartments();
    await createTeachers();
    await createGroups();
    await createStudents();
    await createCourses();
    await createRosters();
    await createGrades();
    console.log('Seeding completed successfully');
  } catch (error) {
    console.error('Error during seeding:', error);
    throw error;
  }
};

// Run the seeder
seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
