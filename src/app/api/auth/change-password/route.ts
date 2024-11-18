import { pipeline } from '@/server';
import { changePassword } from '@/server/auth/changePassword';

export async function POST(req: Request) {
  const changePasswordReq = await req.json();
  console.log(changePasswordReq);

  const result = await pipeline({
    execFunc: () => changePassword(changePasswordReq),
  });
  return Response.json(result);
}
