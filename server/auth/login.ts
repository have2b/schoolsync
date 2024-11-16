import prisma from '@/prisma';
import { PipelineResult } from '@/types';
import { Account } from '@prisma/client';
import argon2 from 'argon2';
import { createSession, logger } from '../utils';

interface LoginReq {
  username: string;
  password: string;
}
export const login = async (req: LoginReq): Promise<PipelineResult<Account | unknown>> => {
  try {
    const { username, password } = req;

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

    if (!(await argon2.verify(findAccount.password, password))) {
      return {
        status: 401,
        message: 'incorrectPassword',
        data: null,
      };
    }

    if (!findAccount.isActive) {
      return {
        status: 401,
        message: 'accountDisabled',
        data: null,
      };
    }

    await createSession(findAccount.id, findAccount.role);

    return {
      status: 200,
      message: 'loginSuccess',
      data: findAccount,
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
