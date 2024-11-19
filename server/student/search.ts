import prisma from '@/prisma';
import { PipelineResult } from '@/types';
import { Prisma } from '@prisma/client';
import { logger } from '../utils';

interface SearchStudentsReq {
  name: string;
  rosterId: number;
}

export type SearchStudentsRes = Prisma.StudentGetPayload<{ select: { name: true; id: true } }>;

export const searchStudents = async (
  req: SearchStudentsReq
): Promise<PipelineResult<SearchStudentsRes[] | unknown>> => {
  try {
    const { name, rosterId } = req;

    const students = await prisma.student.findMany({
      where: {
        name: {
          contains: name,
          mode: 'insensitive',
        },
        grades: {
          none: {
            rosterId,
          },
        },
      },
      select: {
        name: true,
        id: true,
      },
    });

    return {
      status: 200,
      message: 'success',
      data: students,
    };
  } catch (error) {
    logger.error('Error searching students', error);
    return {
      status: 500,
      message: 'internalError',
      data: null,
    };
  }
};
