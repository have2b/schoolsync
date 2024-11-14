import prisma from '@/prisma';
import { PipelineResult } from '@/types';
import { Prisma } from '@prisma/client';
import { logger } from '../utils';

export const getTeacherById = async (
  id: string
): Promise<
  PipelineResult<
    Prisma.TeacherGetPayload<{ include: { account: { select: { avatar: true } } } }> | unknown
  >
> => {
  try {
    const existingTeacher = await prisma.teacher.findFirst({
      where: {
        id: Number(id),
      },
      include: {
        account: {
          select: {
            avatar: true,
          },
        },
      },
    });

    if (!existingTeacher) {
      return {
        status: 404,
        message: 'notFound',
        data: null,
      };
    }

    return {
      status: 200,
      message: 'success',
      data: existingTeacher,
    };
  } catch (error) {
    logger.error('Error getting teacher', error);
    return {
      status: 500,
      message: 'internalError',
      data: null,
    };
  }
};
