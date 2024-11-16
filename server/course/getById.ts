import prisma from '@/prisma';
import { PipelineResult } from '@/types';
import { Course } from '@prisma/client';
import { logger } from '../utils';

export const getCourseById = async (id: string): Promise<PipelineResult<Course | unknown>> => {
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

    return {
      status: 200,
      message: 'success',
      data: existingCourse,
    };
  } catch (error) {
    logger.error('Error getting course', error);
    return {
      status: 500,
      message: 'internalError',
      data: null,
    };
  }
};
