import prisma from '@/prisma';
import { cache } from 'react';
import { logger } from './logger';
import { verifySession } from './session';

export const getAccount = cache(async () => {
  const session = await verifySession();
  if (!session) return null;

  try {
    const data = await prisma.account.findUnique({
      where: {
        id: session.accountId as number,
      },
    });

    return data;
  } catch (error) {
    logger.error('Error getting account', error);
    return null;
  }
});
