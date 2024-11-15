import { pipeline } from '@/server';
import { bulkDeleteGroup } from '@/server/group';

export async function POST(req: Request) {
  const deleteGroupReq = await req.json();

  const result = await pipeline({
    execFunc: () => bulkDeleteGroup(deleteGroupReq),
  });
  return Response.json(result);
}
