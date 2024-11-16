import prisma from '@/prisma';
import { PipelineResult } from '@/types';
import { Prisma } from '@prisma/client';
import { logger } from '../utils';

export type GetRosterByIdRes = Prisma.RosterGetPayload<true>;

export const getRosterById = async (
  id: string
): Promise<PipelineResult<GetRosterByIdRes | unknown>> => {
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

    return {
      status: 200,
      message: 'success',
      data: existingRoster,
    };
  } catch (error) {
    logger.error('Error getting roster', error);
    return {
      status: 500,
      message: 'internalError',
      data: null,
    };
  }
};
