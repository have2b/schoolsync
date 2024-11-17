import prisma from '@/prisma';
import { PipelineResult } from '@/types';
import { Prisma } from '@prisma/client';
import { logger } from '../utils';

export type GetGradeByIdRes = Prisma.RosterGetPayload<{
  select: {
    grades: {
      include: {
        student: {
          select: {
            name: true;
            code: true;
          };
        };
      };
    };
  };
}>;

export type GetGradeRes = Prisma.GradeGetPayload<{
  include: {
    student: {
      select: {
        name: true;
        code: true;
      };
    };
  };
}>;

export const getGradeById = async (
  id: string
): Promise<PipelineResult<GetGradeRes[] | unknown>> => {
  try {
    const existingGrade = await prisma.roster.findFirst({
      where: {
        id: Number(id),
      },
      select: {
        name: true,
        grades: {
          include: {
            student: {
              select: {
                name: true,
                code: true,
              },
            },
          },
        },
      },
    });

    if (!existingGrade) {
      return {
        status: 404,
        message: 'notFound',
        data: null,
      };
    }

    return {
      status: 200,
      message: 'success',
      data: existingGrade,
    };
  } catch (error) {
    logger.error('Error getting roster', error);
    return {
      status: 500,
      message: 'internalError',
      data: null,
    };
  }
};
