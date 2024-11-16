import prisma from '@/prisma';
import { PipelineResult } from '@/types';
import { logger } from '../utils';

interface DeleteRes {
  id: number;
}

export const deleteRoster = async (id: string): Promise<PipelineResult<DeleteRes | unknown>> => {
  try {
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

    const deletedRoster = await prisma.roster.update({
      where: {
        id: Number(id),
      },
      data: {
        isActive: false,
      },
    });

    return {
      status: 204,
      message: 'deleted',
      data: deletedRoster.id,
    };
  } catch (error) {
    logger.error('Error deleting roster', error);
    return {
      status: 500,
      message: 'internalError',
      data: null,
    };
  }
};
