import prisma from '@/prisma';
import { PipelineResult } from '@/types';
import { Prisma } from '@prisma/client';
import { logger } from '../utils';

export type GetStudentByIdRes = Prisma.StudentGetPayload<{
  include: {
    account: {
      select: {
        avatar: true;
        email: true;
      };
    };
    group: {
      select: {
        name: true;
      };
    };
    department: {
      select: {
        name: true;
      };
    };
  };
}>;

export const getStudentById = async (
  id: string
): Promise<PipelineResult<GetStudentByIdRes | unknown>> => {
  try {
    const existingStudent = await prisma.student.findFirst({
      where: {
        id: Number(id),
      },
      include: {
        account: {
          select: {
            avatar: true,
            email: true,
          },
        },
        group: {
          select: {
            name: true,
          },
        },
        department: {
          select: {
            name: true,
          },
        },
      },
    });

    if (!existingStudent) {
      return {
        status: 404,
        message: 'notFound',
        data: null,
      };
    }

    return {
      status: 200,
      message: 'success',
      data: existingStudent,
    };
  } catch (error) {
    logger.error('Error getting student', error);
    return {
      status: 500,
      message: 'internalError',
      data: null,
    };
  }
};
