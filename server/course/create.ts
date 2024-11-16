import prisma from '@/prisma';
import { PipelineResult } from '@/types';
import { logger } from '../utils';

interface CreateCourseReq {
  code: string;
  name: string;
  credit: number;
  lesson: number;
}

interface CreateCourseRes {
  id: number;
}

export const createCourse = async (
  req: CreateCourseReq
): Promise<PipelineResult<CreateCourseRes | unknown>> => {
  try {
    const { code, name, credit, lesson } = req;

    const existingCourse = await prisma.course.findFirst({
      where: {
        OR: [{ code }, { name }],
      },
    });

    if (existingCourse) {
      return {
        status: 400,
        message: existingCourse.code === code ? 'duplicatedCode' : 'duplicatedName',
        data: null,
      };
    }

    const course = await prisma.course.create({
      data: {
        code,
        name,
        credit,
        lesson,
      },
    });

    return {
      status: 201,
      message: 'created',
      data: {
        id: course.id,
        code: course.code,
      },
    };
  } catch (error) {
    logger.error('Error creating course', error);
    return {
      status: 500,
      message: 'internalError',
      data: null,
    };
  }
};
