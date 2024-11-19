import prisma from '@/prisma';
import { PipelineResult } from '@/types';
import { Prisma } from '@prisma/client';
import { logger } from '../utils';

export type GetListRosterByStudentRes = Prisma.GradeGetPayload<{
  select: {
    roster: {
      select: {
        course: {
          select: {
            code: true;
            name: true;
            credit: true;
            lesson: true;
          };
        };
        year: true;
        semester: true;
        teacher: {
          select: {
            name: true;
          };
        };
      };
    };
  };
}>;

export const getRostersByStudent = async (
  id: string
): Promise<PipelineResult<GetListRosterByStudentRes[] | unknown>> => {
  try {
    const rosters = await prisma.grade.findMany({
      where: {
        studentId: Number(id),
      },
      select: {
        roster: {
          select: {
            course: {
              select: {
                code: true,
                name: true,
                credit: true,
                lesson: true,
              },
            },
            year: true,
            semester: true,
            teacher: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    // Return successful response
    return {
      status: 200,
      message: 'retrieved',
      data: rosters,
    };
  } catch (error) {
    logger.error('Error getting rosters', error);
    return {
      status: 500,
      message: 'internalError',
      data: null,
    };
  }
};
