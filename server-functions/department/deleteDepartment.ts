import prisma from '@/prisma';
import { PipelineResult } from '../interfaces';
import { logger } from '../lib';

interface DeleteDepartmentRes {
  id: number;
}

export const deleteDepartment = async (
  id: string
): Promise<PipelineResult<DeleteDepartmentRes | unknown>> => {
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

    const deletedDepartment = await prisma.department.delete({
      where: {
        id: Number(id),
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
