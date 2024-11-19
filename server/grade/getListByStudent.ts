import prisma from '@/prisma';
import { PipelineResult } from '@/types';
import { Prisma } from '@prisma/client';
import { logger } from '../utils';

export type GetGradeByStudentRes = Prisma.GradeGetPayload<{
  include: {
    roster: {
      select: {
        course: {
          select: {
            code: true;
            name: true;
            credit: true;
          };
        };
        year: true;
        semester: true;
      };
    };
  };
}>;

export const getGradesByStudent = async (
  id: string
): Promise<PipelineResult<GetGradeByStudentRes[] | unknown>> => {
  try {
    const grades = await prisma.grade.findMany({
      where: {
        studentId: Number(id),
      },
      include: {
        roster: {
          select: {
            course: {
              select: {
                code: true,
                name: true,
                credit: true,
              },
            },
            year: true,
            semester: true,
          },
        },
      },
    });

    // Return successful response
    return {
      status: 200,
      message: 'retrieved',
      data: grades,
    };
  } catch (error) {
    logger.error('Error getting grades', error);
    return {
      status: 500,
      message: 'internalError',
      data: null,
    };
  }
};
