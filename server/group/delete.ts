import prisma from '@/prisma';
import { PipelineResult } from '@/types';
import { logger } from '../utils';

interface DeleteRes {
  id: number;
}

export const deleteGroup = async (id: string): Promise<PipelineResult<DeleteRes | unknown>> => {
  try {
    const existingGroup = await prisma.group.findFirst({
      where: {
        id: Number(id),
      },
    });

    if (!existingGroup) {
      return {
        status: 404,
        message: 'notFound',
        data: null,
      };
    }

    const deletedGroup = await prisma.group.update({
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
      data: deletedGroup.id,
    };
  } catch (error) {
    logger.error('Error deleting group', error);
    return {
      status: 500,
      message: 'internalError',
      data: null,
    };
  }
};
