import prisma from '@/prisma';
import { PipelineResult } from '@/types';
import { Course } from '@prisma/client';
import { logger } from '../utils';

export const getCourses = async (): Promise<PipelineResult<Course[] | unknown>> => {
  try {
    const data = await prisma.course.findMany({});

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
