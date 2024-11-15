import { pipeline } from '@/server';
import { getGroups } from '@/server/group';

export async function GET() {
  const res = await pipeline({
    execFunc: () => getGroups(),
  });
  return Response.json(res);
}
