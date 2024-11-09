import prisma from '@/prisma';
import { CreateDepartmentReq, CreateDepartmentRes, PipelineResult } from '@/types';
import { logger } from '../utils';

const generateDepartmentCode = async (): Promise<string> => {
  // Get the latest department
  const lastDepartment = await prisma.department.findFirst({
    orderBy: {
      departmentCode: 'desc',
    },
  });

  // If no departments exist, start with K001
  if (!lastDepartment) {
    return 'K001';
  }

  // Extract the number from the last code and increment it
  const lastNumber = parseInt(lastDepartment.departmentCode.substring(1));
  const nextNumber = lastNumber + 1;

  // Format the new code with leading zeros
  return `K${nextNumber.toString().padStart(3, '0')}`;
};

export const createDepartment = async (
  req: CreateDepartmentReq
): Promise<PipelineResult<CreateDepartmentRes | unknown>> => {
  try {
    const { name, detail } = req;

    // Generate the next department code
    const departmentCode = await generateDepartmentCode();

    const department = await prisma.department.create({
      data: {
        name,
        detail,
        departmentCode,
      },
    });

    return {
      status: 200,
      message: 'created',
      data: {
        id: department.id,
        departmentCode: department.departmentCode,
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
