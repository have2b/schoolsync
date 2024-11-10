import prisma from '@/prisma';
import { PipelineResult } from '@/types';
import { Department } from '@prisma/client';
import { logger } from '../utils';

export const getDepartmentById = async (
  id: string
): Promise<PipelineResult<Department | unknown>> => {
  try {
    const existingDepartment = await prisma.department.findFirst({
      where: {
        id: Number(id),
      },
    });

    if (!existingDepartment) {
      return {
        status: 404,
        message: 'notFound',
        data: null,
      };
    }

    return {
      status: 200,
      message: 'success',
      data: existingDepartment,
    };
  } catch (error) {
    logger.error('Error getting department', error);
    return {
      status: 500,
      message: 'internalError',
      data: null,
    };
  }
};
