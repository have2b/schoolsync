import prisma from '@/prisma';
import { PipelineResult } from '@/types';
import { logger } from '../utils';

interface CreateGroupReq {
  name: string;
  capacity: number;
  teacherId: number;
  departmentId: number;
}

interface CreateGroupRes {
  id: number;
}

const generateGroupCode = async (): Promise<string> => {
  // Get the latest group
  const lastGroup = await prisma.group.findFirst({
    orderBy: {
      code: 'desc',
    },
  });

  // If no teachers exist, start with GV001
  if (!lastGroup) {
    return 'LHC001';
  }

  // Extract the number from the last code and increment it
  const lastNumber = parseInt(lastGroup.code.substring(3));
  const nextNumber = lastNumber + 1;

  // Format the new code with leading zeros
  return `LHC${nextNumber.toString().padStart(3, '0')}`;
};

export const createGroup = async (
  req: CreateGroupReq
): Promise<PipelineResult<CreateGroupRes | unknown>> => {
  try {
    const { name, capacity, teacherId, departmentId } = req;

    const existedName = await prisma.group.findFirst({
      where: {
        name,
      },
    });

    if (existedName) {
      return {
        status: 400,
        message: 'duplicatedName',
        data: null,
      };
    }

    // Generate the next group code
    const code = await generateGroupCode();

    const createdGroup = await prisma.group.create({
      data: {
        code,
        name,
        capacity,
        teacherId,
        departmentId,
      },
    });

    return {
      status: 201,
      message: 'created',
      data: {
        id: createdGroup.id,
        code: createdGroup.code,
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
