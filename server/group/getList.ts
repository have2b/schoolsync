import prisma from '@/prisma';
import { PipelineResult } from '@/types';
import { Prisma } from '@prisma/client';
import { logger } from '../utils';

export type GetListGroupRes = Prisma.GroupGetPayload<{
  include: { teacher: { select: { name: true } }; department: { select: { name: true } } };
}>;

export const getGroups = async (): Promise<PipelineResult<GetListGroupRes[] | unknown>> => {
  try {
    const data = await prisma.group.findMany({
      include: {
        teacher: {
          select: {
            name: true,
          },
        },
        department: {
          select: {
            name: true,
          },
        },
      },
    });

    // Return successful response
    return {
      status: 200,
      message: 'retrieved',
      data: {
        data,
      },
    };
  } catch (error) {
    logger.error('Error getting groups', error);
    return {
      status: 500,
      message: 'internalError',
      data: null,
    };
  }
};
