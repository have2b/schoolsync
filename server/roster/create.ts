import prisma from '@/prisma';
import { PipelineResult } from '@/types';
import { logger } from '../utils';

interface CreateRosterReq {
  capacity: number;
  semester: number;
  year: number;
  startDate: string;
  endDate: string;
  courseId: number;
  teacherId: number;
}

interface CreateRosterRes {
  id: number;
}

export const createRoster = async (
  req: CreateRosterReq
): Promise<PipelineResult<CreateRosterRes | unknown>> => {
  try {
    const { capacity, semester, year, startDate, endDate, courseId, teacherId } = req;

    const choseCourse = await prisma.course.findFirst({
      where: {
        id: courseId,
      },
      include: {
        rosters: true,
      },
    });

    if (!choseCourse) {
      return {
        status: 404,
        message: 'notFound',
        data: null,
      };
    }

    const createdRoster = await prisma.roster.create({
      data: {
        code: `${choseCourse.code}_${choseCourse.rosters.length + 1}`,
        name: choseCourse.name,
        capacity,
        semester,
        year,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        courseId,
        teacherId,
      },
    });

    return {
      status: 201,
      message: 'created',
      data: {
        id: createdRoster.id,
        code: createdRoster.code,
      },
    };
  } catch (error) {
    logger.error('Error creating roster', error);
    return {
      status: 500,
      message: 'internalError',
      data: null,
    };
  }
};
