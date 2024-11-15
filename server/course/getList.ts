import prisma from '@/prisma';
import { PipelineResult } from '@/types';
import { Prisma } from '@prisma/client';
import { logger } from '../utils';

export type GetListCourseRes = Prisma.CourseGetPayload<{
  include: { teacher: { select: { name: true } } };
}>;

export const getCourses = async (): Promise<PipelineResult<GetListCourseRes[] | unknown>> => {
  try {
    const data = await prisma.course.findMany({
      include: {
        teacher: {
          select: {
            name: true,
          },
        },
      },
    });

    // Return successful response
    return {
      status: 200,
      message: 'retrieved',
      data: {
        data,
      },
    };
  } catch (error) {
    logger.error('Error getting courses', error);
    return {
      status: 500,
      message: 'internalError',
      data: null,
    };
  }
};
