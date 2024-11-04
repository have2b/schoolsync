import prisma from '@/prisma';
import argon2 from 'argon2';
import { createSession } from '../../lib/session';
import { PipelineResult } from '../../types';
import { LoginReq } from './loginReq';
import { LoginRes } from './loginRes';

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
      message: 'Account not found',
      data: null,
    };
  }

  if (!(await argon2.verify(findAccount.password, password))) {
    return {
      status: 401,
      message: 'Incorrect password',
      data: null,
    };
  }

  await createSession(findAccount.id, findAccount.role);

  return {
    status: 200,
    message: 'Login success',
    data: {
      username: findAccount.username,
    },
  };
};
