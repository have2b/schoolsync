import prisma from '@/prisma';
import { PipelineResult } from '@/types';
import { Account } from '@prisma/client';
import argon2 from 'argon2';
import { logger } from '../utils';

interface ChangePasswordReq {
  username: string;
  oldPassword: string;
  newPassword: string;
}
export const changePassword = async (
  req: ChangePasswordReq
): Promise<PipelineResult<Account | unknown>> => {
  try {
    const { username, oldPassword, newPassword } = req;

    const findAccount = await prisma.account.findFirst({
      where: {
        username,
      },
    });

    if (!findAccount) {
      return {
        status: 404,
        message: 'notFound',
        data: null,
      };
    }

    if (!(await argon2.verify(findAccount.password, oldPassword))) {
      return {
        status: 401,
        message: 'incorrectOldPassword',
        data: null,
      };
    }

    const hashedPassword = await argon2.hash(newPassword);

    const updatedAccount = await prisma.account.update({
      where: {
        id: findAccount.id,
      },
      data: {
        password: hashedPassword,
      },
    });

    return {
      status: 200,
      message: 'changedPassword',
      data: updatedAccount.id,
    };
  } catch (error) {
    logger.error('Error logging in', error);
    return {
      status: 500,
      message: 'internalError',
      data: null,
    };
  }
};
