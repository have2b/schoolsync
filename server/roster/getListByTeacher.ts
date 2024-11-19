import prisma from '@/prisma';
import { PipelineResult } from '@/types';
import { Prisma } from '@prisma/client';
import { logger } from '../utils';

export type GetListRosterByTeacherRes = Prisma.RosterGetPayload<{
  select: {
    course: {
      select: {
        credit: true;
        lesson: true;
        name: true;
        code: true;
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
}>;

export const getRostersByTeacher = async (
  id: string
): Promise<PipelineResult<GetListRosterByTeacherRes[] | unknown>> => {
  try {
    const rosters = await prisma.roster.findMany({
      where: {
        teacherId: Number(id),
      },
      select: {
        course: {
          select: {
            name: true,
            code: true,
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
