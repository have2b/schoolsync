import prisma from '@/prisma';
import { PipelineResult } from '@/types';
import { logger } from '../utils';

interface CreateDepartmentReq {
  name: string;
  detail?: string;
}

interface CreateDepartmentRes {
  id: number;
}
const generateDepartmentCode = async (): Promise<string> => {
  // Get the latest department
  const lastDepartment = await prisma.department.findFirst({
    orderBy: {
      code: 'desc',
    },
  });

  // If no departments exist, start with K001
  if (!lastDepartment) {
    return 'K001';
  }

  // Extract the number from the last code and increment it
  const lastNumber = parseInt(lastDepartment.code.substring(1));
  const nextNumber = lastNumber + 1;

  // Format the new code with leading zeros
  return `K${nextNumber.toString().padStart(3, '0')}`;
};

export const createDepartment = async (
  req: CreateDepartmentReq
): Promise<PipelineResult<CreateDepartmentRes | unknown>> => {
  try {
    const { name, detail } = req;

    const isExisted = await prisma.department.findFirst({
      where: {
        name,
      },
    });

    if (isExisted) {
      return {
        status: 400,
        message: 'duplicatedName',
        data: null,
      };
    }

    // Generate the next department code
    const code = await generateDepartmentCode();

    const department = await prisma.department.create({
      data: {
        name,
        detail,
        code,
      },
    });

    return {
      status: 201,
      message: 'created',
      data: {
        id: department.id,
        code: department.code,
      },
    };
  } catch (error) {
    logger.error('Error creating department', error);
    return {
      status: 500,
      message: 'internalError',
      data: null,
    };
  }
};
