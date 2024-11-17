import prisma from '@/prisma';
import { PipelineResult } from '@/types';
import { logger } from '../utils';

interface DeleteRes {
  id: number;
}

export const bulkDeleteGroup = async (
  ids: string[]
): Promise<PipelineResult<DeleteRes[] | unknown>> => {
  try {
    // Convert string IDs to numbers if necessary (assuming IDs are numeric)
    const numericIds = ids.map((id) => Number(id));

    // Check if the groups exist
    const existingGroups = await prisma.group.findMany({
      where: {
        id: {
          in: numericIds,
        },
      },
    });

    if (existingGroups.length === 0) {
      return {
        status: 404,
        message: 'notFound',
        data: null,
      };
    }

    // Perform bulk deletion
    const deletedGroups = await prisma.group.updateMany({
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
      data: deletedGroups,
    };
  } catch (error) {
    logger.error('Error deleting groups', error);
    return {
      status: 500,
      message: 'internalError',
      data: null,
    };
  }
};