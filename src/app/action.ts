'use server';

import prisma from '@/prisma';
import { logger } from '@/server/utils';
import { SessionPayload } from '@/types';
import { jwtVerify, SignJWT } from 'jose';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { cache } from 'react';

export async function logout() {
  (await cookies()).delete('AUTH_SESSION_TOKEN');
  return true;
}

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

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('2hour')
    .sign(encodedKey);
}

export async function decrypt(session: string | undefined = '') {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ['HS256'],
    });
    return payload;
  } catch (error) {
    logger.error('Error decrypting session', error);
  }
}

export async function createSession(accountId: number, role: string) {
  const expiresAt = new Date(Date.now() + 2 * 60 * 60 * 1000);
  const token = await encrypt({ accountId, expiresAt, role });
  return (await cookies()).set('AUTH_SESSION_TOKEN', token, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  });
}

export const verifySession = cache(async () => {
  const cookie = (await cookies()).get('AUTH_SESSION_TOKEN')?.value;
  const session = await decrypt(cookie);

  if (!session?.accountId) {
    redirect('/');
  }

  return { accountId: session.accountId, role: session.role };
});
