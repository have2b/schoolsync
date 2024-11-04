import { login, pipeline } from '@/funcs';

export async function POST(req: Request) {
  const loginReq = await req.json();
  const result = await pipeline({
    execFunc: () => login(loginReq),
  });
  return Response.json(result);
}
