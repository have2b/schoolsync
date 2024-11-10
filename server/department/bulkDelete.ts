import prisma from '@/prisma';
import { DeleteDepartmentRes, PipelineResult } from '@/types';
import { logger } from '../utils';

export const bulkDeleteDepartment = async (
  ids: string[]
): Promise<PipelineResult<DeleteDepartmentRes[] | unknown>> => {
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
    const deletedDepartments = await prisma.department.deleteMany({
      where: {
        id: {
          in: numericIds,
        },
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
