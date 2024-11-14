import prisma from '@/prisma';
import { PipelineResult } from '@/types';
import { logger } from '../utils';

interface DeleteRes {
  id: number;
}

export const deleteDepartment = async (
  id: string
): Promise<PipelineResult<DeleteRes | unknown>> => {
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

    const deletedDepartment = await prisma.department.update({
      where: {
        id: Number(id),
      },
      data: {
        isActive: false,
      },
    });

    return {
      status: 204,
      message: 'deleted',
      data: deletedDepartment.id,
    };
  } catch (error) {
    logger.error('Error deleting department', error);
    return {
      status: 500,
      message: 'internalError',
      data: null,
    };
  }
};
