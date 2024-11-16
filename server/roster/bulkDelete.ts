import prisma from '@/prisma';
import { PipelineResult } from '@/types';
import { logger } from '../utils';

interface DeleteRes {
  id: number;
}

export const bulkDeleteRoster = async (
  ids: string[]
): Promise<PipelineResult<DeleteRes[] | unknown>> => {
  try {
    // Convert string IDs to numbers if necessary (assuming IDs are numeric)
    const numericIds = ids.map((id) => Number(id));

    // Check if the rosters exist
    const existingRosters = await prisma.roster.findMany({
      where: {
        id: {
          in: numericIds,
        },
      },
    });

    if (existingRosters.length === 0) {
      return {
        status: 404,
        message: 'notFound',
        data: null,
      };
    }

    // Perform bulk deletion
    const deletedRosters = await prisma.roster.updateMany({
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
      data: deletedRosters,
    };
  } catch (error) {
    logger.error('Error deleting rosters', error);
    return {
      status: 500,
      message: 'internalError',
      data: null,
    };
  }
};
