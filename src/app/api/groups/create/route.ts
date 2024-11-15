import { pipeline } from '@/server';
import { createGroup } from '@/server/group';

export async function POST(req: Request) {
  const createGroupReq = await req.json();
  const result = await pipeline({
    execFunc: () => createGroup(createGroupReq),
  });
  return Response.json(result);
}
