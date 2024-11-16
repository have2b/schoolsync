import prisma from '@/prisma';
import { PipelineResult } from '@/types';
import { logger } from '../utils';

interface DeleteRes {
  id: number;
}

export const bulkDeleteStudent = async (
  ids: string[]
): Promise<PipelineResult<DeleteRes[] | unknown>> => {
  try {
    // Convert string IDs to numbers if necessary (assuming IDs are numeric)
    const numericIds = ids.map((id) => Number(id));

    // Check if the students exist
    const existingStudents = await prisma.student.findMany({
      where: {
        id: {
          in: numericIds,
        },
      },
    });

    if (existingStudents.length === 0) {
      return {
        status: 404,
        message: 'notFound',
        data: null,
      };
    }

    // Perform bulk deletion
    const deletedStudents = await prisma.account.updateMany({
      where: {
        id: {
          in: existingStudents.map((student) => student.accountId),
        },
      },
      data: {
        isActive: false,
      },
    });

    return {
      status: 204,
      message: 'deleted',
      data: deletedStudents,
    };
  } catch (error) {
    logger.error('Error deleting students', error);
    return {
      status: 500,
      message: 'internalError',
      data: null,
    };
  }
};
