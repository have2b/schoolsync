import prisma from '@/prisma';
import { PipelineResult } from '@/types';
import { faker } from '@faker-js/faker';
import { Degree } from '@prisma/client';
import { generateAccountEmail, generatePassword, logger } from '../utils';

interface CreateTeacherReq {
  name: string;
  degree: string;
  major: string;
  departmentId: string;
}

interface CreateTeacherRes {
  id: number;
}

const generateTeacherCode = async (): Promise<string> => {
  // Get the latest teacher
  const lastTeacher = await prisma.teacher.findFirst({
    orderBy: {
      code: 'desc',
    },
  });

  // If no teachers exist, start with GV001
  if (!lastTeacher) {
    return 'GV001';
  }

  // Extract the number from the last code and increment it
  const lastNumber = parseInt(lastTeacher.code.substring(2));
  const nextNumber = lastNumber + 1;

  // Format the new code with leading zeros
  return `GV${nextNumber.toString().padStart(3, '0')}`;
};

export const createTeacher = async (
  req: CreateTeacherReq
): Promise<PipelineResult<CreateTeacherRes | unknown>> => {
  try {
    const { name, degree, major, departmentId } = req;

    // Generate the next department code
    const code = await generateTeacherCode();

    const result = await prisma.$transaction(async (tx) => {
      const account = await tx.account.create({
        data: {
          username: code,
          email: await generateAccountEmail(name),
          password: generatePassword(name, code),
          role: 'Teacher',
          avatar: faker.image.avatar(),
        },
      });

      return await tx.teacher.create({
        data: {
          code,
          name,
          degree: degree as Degree,
          major,
          accountId: account.id,
          departmentId: Number(departmentId),
        },
      });
    });
    return {
      status: 201,
      message: 'created',
      data: {
        id: result.id,
        code: result.code,
      },
    };
  } catch (error) {
    logger.error('Error creating teacher', error);
    return {
      status: 500,
      message: 'internalError',
      data: null,
    };
  }
};
