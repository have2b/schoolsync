import prisma from '@/prisma';
import { PipelineResult } from '@/types';
import { Department } from '@prisma/client';
import { logger } from '../utils';

export const getDepartments = async (): Promise<PipelineResult<Department[] | unknown>> => {
  try {
    const data = await prisma.department.findMany({});

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
