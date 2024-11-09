import prisma from '@/prisma';
import { LoginReq, LoginRes, PipelineResult } from '@/types';
import argon2 from 'argon2';
import { createSession } from '../utils';

export const login = async (req: LoginReq): Promise<PipelineResult<LoginRes | unknown>> => {
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

  await createSession(findAccount.id, findAccount.role);

  return {
    status: 200,
    message: 'loginSuccess',
    data: {
      username: findAccount.username,
    },
  };
};
