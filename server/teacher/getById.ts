import prisma from '@/prisma';
import { PipelineResult } from '@/types';
import { Teacher } from '@prisma/client';
import { logger } from '../utils';

export const getTeacherById = async (id: string): Promise<PipelineResult<Teacher | unknown>> => {
  try {
    const existingTeacher = await prisma.teacher.findFirst({
      where: {
        id: Number(id),
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
