import prisma from '@/prisma';
import { PipelineResult } from '@/types';
import { Prisma } from '@prisma/client';
import { logger } from '../utils';

export type GetTeacherListRes = Prisma.TeacherGetPayload<{
  include: { account: { select: { isActive: true; email: true } } };
}>;

export const getTeachers = async (): Promise<PipelineResult<GetTeacherListRes[] | unknown>> => {
  try {
    const data = await prisma.teacher.findMany({
      include: {
        account: {
          select: {
            isActive: true,
            email: true,
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
    logger.error('Error getting teachers', error);
    return {
      status: 500,
      message: 'internalError',
      data: null,
    };
  }
};
