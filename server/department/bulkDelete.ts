import prisma from '@/prisma';
import { PipelineResult } from '@/types';
import { logger } from '../utils';

interface DeleteRes {
  id: number;
}

export const bulkDeleteDepartment = async (
  ids: string[]
): Promise<PipelineResult<DeleteRes[] | unknown>> => {
  try {
    // Convert string IDs to numbers if necessary (assuming IDs are numeric)
    const numericIds = ids.map((id) => Number(id));

    // Check if the departments exist
    const existingDepartments = await prisma.department.findMany({
      where: {
        id: {
          in: numericIds,
        },
      },
    });

    if (existingDepartments.length === 0) {
      return {
        status: 404,
        message: 'notFound',
        data: null,
      };
    }

    // Perform bulk deletion
    const deletedDepartments = await prisma.department.updateMany({
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
      data: deletedDepartments,
    };
  } catch (error) {
    logger.error('Error deleting departments', error);
    return {
      status: 500,
      message: 'internalError',
      data: null,
    };
  }
};
