import prisma from '@/prisma';
import { PipelineResult } from '@/types';
import { Prisma } from '@prisma/client';
import { logger } from '../utils';

export type GetListRosterRes = Prisma.RosterGetPayload<true>;

export const getRosters = async (): Promise<PipelineResult<GetListRosterRes[] | unknown>> => {
  try {
    const data = await prisma.roster.findMany({});

    // Return successful response
    return {
      status: 200,
      message: 'retrieved',
      data: {
        data,
      },
    };
  } catch (error) {
    logger.error('Error getting rosters', error);
    return {
      status: 500,
      message: 'internalError',
      data: null,
    };
  }
};
