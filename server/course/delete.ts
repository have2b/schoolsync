import prisma from '@/prisma';
import { PipelineResult } from '@/types';
import { logger } from '../utils';

interface DeleteRes {
  id: number;
}

export const deleteCourse = async (id: string): Promise<PipelineResult<DeleteRes | unknown>> => {
  try {
    const existingCourse = await prisma.course.findFirst({
      where: {
        id: Number(id),
      },
    });

    if (!existingCourse) {
      return {
        status: 404,
        message: 'notFound',
        data: null,
      };
    }

    const deletedCourse = await prisma.course.update({
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
      data: deletedCourse.id,
    };
  } catch (error) {
    logger.error('Error deleting course', error);
    return {
      status: 500,
      message: 'internalError',
      data: null,
    };
  }
};
