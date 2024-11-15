import { pipeline } from '@/server';
import { updateGroup } from '@/server/group';

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const updateGroupReq = await req.json();
  const id = (await params).id;
  const res = await pipeline({
    execFunc: () => updateGroup(id, updateGroupReq),
  });
  return Response.json(res);
}
