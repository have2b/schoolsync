import prisma from '@/prisma';
import { PipelineResult } from '@/types';
import { logger } from '../utils';

interface UpdateCourseReq {
  code?: string;
  name?: string;
  credit?: number;
  lesson?: number;
  semester?: number;
  year?: number;
  startedAt?: string;
  endedAt?: string;
  teacherId?: number;
}

interface UpdateRes {
  id: number;
}

export const updateCourse = async (
  id: string,
  req: UpdateCourseReq
): Promise<PipelineResult<UpdateRes | unknown>> => {
  try {
    const { code, name, credit, lesson, semester, year, startedAt, endedAt, teacherId } = req;

    // Check if the course exists
    const existingCourse = await prisma.course.findFirst({
      where: {
        id: Number(id),
      },
    });

    if (!existingCourse) {
      return {
        status: 404,
        message: 'notFound',
        data: null,
      };
    }

    // Check for duplicate code or name if new values are provided
    if (code || name) {
      const existedCourse = await prisma.course.findFirst({
        where: {
          OR: [{ code }, { name }].filter(Boolean), // Remove undefined values from the OR condition
          NOT: { id: Number(id) }, // Exclude the current course
        },
      });

      if (existedCourse && existedCourse.id !== existingCourse.id) {
        return {
          status: 400,
          message: existedCourse.code === code ? 'duplicatedCode' : 'duplicatedName',
          data: null,
        };
      }
    }

    // Update the course
    const updatedCourse = await prisma.course.update({
      where: {
        id: Number(id),
      },
      data: {
        code: code ?? existingCourse.code,
        name: name ?? existingCourse.name,
        credit: credit ?? existingCourse.credit,
        lesson: lesson ?? existingCourse.lesson,
        semester: semester ?? existingCourse.semester,
        year: year ?? existingCourse.year,
        startedAt: startedAt ? new Date(startedAt) : existingCourse.startedAt,
        endedAt: endedAt ? new Date(endedAt) : existingCourse.endedAt,
        teacherId: teacherId ?? existingCourse.teacherId,
      },
    });

    return {
      status: 204,
      message: 'updated',
      data: updatedCourse.id, // Consider returning more details
    };
  } catch (error) {
    logger.error('Error updating course', error);
    return {
      status: 500,
      message: 'internalError',
      data: null,
    };
  }
};
