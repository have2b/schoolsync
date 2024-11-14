import prisma from '@/prisma';
import { PipelineResult } from '@/types';
import { Teacher } from '@prisma/client';
import { logger } from '../utils';

export const getTeachers = async (): Promise<PipelineResult<Teacher[] | unknown>> => {
  try {
    const data = await prisma.teacher.findMany({});

    // Return successful response
    return {
      status: 200,
      message: 'retrieved',
      data: {
        data,
      },
    };
  } catch (error) {
    logger.error('Error getting departments', error);
    return {
      status: 500,
      message: 'internalError',
      data: null,
    };
  }
};
