import prisma from '@/prisma';
import { PipelineResult } from '@/types';
import { Prisma } from '@prisma/client';
import { logger } from '../utils';

export type GetListStudentRes = Prisma.StudentGetPayload<{
  include: {
    group: { select: { name: true; department: { select: { name: true } } } };
    account: {
      select: {
        isActive: true;
        email: true;
      };
    };
  };
}>;

export const getStudents = async (): Promise<PipelineResult<GetListStudentRes[] | unknown>> => {
  try {
    const data = await prisma.student.findMany({
      orderBy: {
        code: 'asc',
      },
      include: {
        group: {
          select: {
            name: true,
            department: {
              select: {
                name: true,
              },
            },
          },
        },
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
    logger.error('Error getting students', error);
    return {
      status: 500,
      message: 'internalError',
      data: null,
    };
  }
};
