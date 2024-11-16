import prisma from '@/prisma';
import { PipelineResult } from '@/types';
import { logger } from '../utils';

interface UpdateRosterReq {
  capacity?: number;
  semester?: number;
  year?: number;
  startDate?: string;
  endDate?: string;
  courseId?: number;
  teacherId?: number;
}

interface UpdateRosterRes {
  id: number;
}

export const updateRoster = async (
  id: string,
  req: UpdateRosterReq
): Promise<PipelineResult<UpdateRosterRes | unknown>> => {
  try {
    const { capacity, semester, year, startDate, endDate, courseId, teacherId } = req;

    const existingRoster = await prisma.roster.findFirst({
      where: {
        id: Number(id),
      },
    });

    if (!existingRoster) {
      return {
        status: 404,
        message: 'notFound',
        data: null,
      };
    }

    const updatedRoster = await prisma.roster.update({
      where: {
        id: Number(id),
      },
      data: {
        capacity: capacity ?? existingRoster.capacity,
        semester: semester ?? existingRoster.semester,
        year: year ?? existingRoster.year,
        startDate: new Date(startDate ?? existingRoster.startDate),
        endDate: new Date(endDate ?? existingRoster.endDate),
        courseId: courseId ?? existingRoster.courseId,
        teacherId: teacherId ?? existingRoster.teacherId,
      },
    });

    return {
      status: 204,
      message: 'updated',
      data: updatedRoster.id,
    };
  } catch (error) {
    logger.error('Error updating roster', error);
    return {
      status: 500,
      message: 'internalError',
      data: null,
    };
  }
};
