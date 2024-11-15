import prisma from '@/prisma';
import { PipelineResult } from '@/types';
import { Prisma } from '@prisma/client';
import { logger } from '../utils';

export const getGroupById = async (
  id: string
): Promise<
  PipelineResult<
    Prisma.GroupGetPayload<{ include: { teacher: { select: { name: true } } } }> | unknown
  >
> => {
  try {
    const existingGroup = await prisma.group.findFirst({
      where: {
        id: Number(id),
      },
      include: {
        teacher: {
          select: {
            name: true,
          },
        },
      },
    });

    if (!existingGroup) {
      return {
        status: 404,
        message: 'notFound',
        data: null,
      };
    }

    return {
      status: 200,
      message: 'success',
      data: existingGroup,
    };
  } catch (error) {
    logger.error('Error getting group', error);
    return {
      status: 500,
      message: 'internalError',
      data: null,
    };
  }
};
