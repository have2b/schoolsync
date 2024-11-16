import prisma from '@/prisma';
import { PipelineResult } from '@/types';
import { faker } from '@faker-js/faker';
import { Gender } from '@prisma/client';
import argon2 from 'argon2';
import { generateAccountEmail, generatePassword, logger } from '../utils';

interface CreateStudentReq {
  name: string;
  dob: string;
  gender: string;
  address: string;
  phone: string;
  groupId: number;
}

interface CreateStudentRes {
  id: number;
}

const generateStudentCode = async (): Promise<string> => {
  // Get the latest student
  const lastStudent = await prisma.student.findFirst({
    orderBy: {
      code: 'desc',
    },
  });

  // If no students exist, start with SV001
  if (!lastStudent) {
    return 'SV00001';
  }

  // Extract the number from the last code and increment it
  const lastNumber = parseInt(lastStudent.code.substring(2));
  const nextNumber = lastNumber + 1;

  // Format the new code with leading zeros
  return `SV${nextNumber.toString().padStart(5, '0')}`;
};

export const createStudent = async (
  req: CreateStudentReq
): Promise<PipelineResult<CreateStudentRes | unknown>> => {
  try {
    const { name, dob, gender, address, phone, groupId } = req;

    const existedPhone = await prisma.student.findFirst({
      where: { phone },
    });

    if (existedPhone) {
      return {
        status: 400,
        message: 'duplicatedPhone',
        data: null,
      };
    }

    // Generate the next department code
    const code = await generateStudentCode();

    const result = await prisma.$transaction(async (tx) => {
      const account = await tx.account.create({
        data: {
          username: code,
          email: await generateAccountEmail(name),
          password: await argon2.hash(generatePassword(name, code)),
          role: 'Student',
          avatar: faker.image.avatar(),
        },
      });

      return await tx.student.create({
        data: {
          code,
          name,
          dob: new Date(dob),
          gender: gender as Gender,
          address,
          phone,
          accountId: account.id,
          groupId,
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
    logger.error('Error creating student', error);
    return {
      status: 500,
      message: 'internalError',
      data: null,
    };
  }
};
