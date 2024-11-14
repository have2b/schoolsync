import prisma from '@/prisma';
import { PipelineResult } from '@/types';
import { logger } from '../utils';

interface DeleteRes {
  id: number;
}

export const bulkDeleteTeacher = async (
  ids: string[]
): Promise<PipelineResult<DeleteRes[] | unknown>> => {
  try {
    // Convert string IDs to numbers if necessary (assuming IDs are numeric)
    const numericIds = ids.map((id) => Number(id));

    // Check if the teachers exist
    const existingTeachers = await prisma.teacher.findMany({
      where: {
        id: {
          in: numericIds,
        },
      },
    });

    if (existingTeachers.length === 0) {
      return {
        status: 404,
        message: 'notFound',
        data: null,
      };
    }

    // Perform bulk deletion
    const deletedTeachers = await prisma.teacher.updateMany({
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
      data: deletedTeachers,
    };
  } catch (error) {
    logger.error('Error deleting teachers', error);
    return {
      status: 500,
      message: 'internalError',
      data: null,
    };
  }
};
