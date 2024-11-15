import prisma from '@/prisma';
import { PipelineResult } from '@/types';
import { logger } from '../utils';

interface DeleteRes {
  id: number;
}

export const bulkDeleteCourse = async (
  ids: string[]
): Promise<PipelineResult<DeleteRes[] | unknown>> => {
  try {
    // Convert string IDs to numbers if necessary (assuming IDs are numeric)
    const numericIds = ids.map((id) => Number(id));

    // Check if the courses exist
    const existingCourses = await prisma.course.findMany({
      where: {
        id: {
          in: numericIds,
        },
      },
    });

    if (existingCourses.length === 0) {
      return {
        status: 404,
        message: 'notFound',
        data: null,
      };
    }

    // Perform bulk deletion
    const deletedCourses = await prisma.course.updateMany({
      where: {
        id: {
          in: numericIds,
        },
      },
      data: {
        isActive: false,
      },
    });

    return {
      status: 204,
      message: 'deleted',
      data: deletedCourses,
    };
  } catch (error) {
    logger.error('Error deleting courses', error);
    return {
      status: 500,
      message: 'internalError',
      data: null,
    };
  }
};
