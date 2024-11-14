import prisma from '@/prisma';
import { DeleteRes, PipelineResult } from '@/types';
import { logger } from '../utils';

export const deleteTeacher = async (id: string): Promise<PipelineResult<DeleteRes | unknown>> => {
  try {
    const existingTeacher = await prisma.teacher.findFirst({
      where: {
        id: Number(id),
      },
    });

    if (!existingTeacher) {
      return {
        status: 404,
        message: 'notFound',
        data: null,
      };
    }

    const deletedTeacher = await prisma.teacher.update({
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
      data: deletedTeacher.id,
    };
  } catch (error) {
    logger.error('Error deleting teacher', error);
    return {
      status: 500,
      message: 'internalError',
      data: null,
    };
  }
};
