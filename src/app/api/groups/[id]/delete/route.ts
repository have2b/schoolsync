import { pipeline } from '@/server';
import { deleteGroup } from '@/server/group';

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  const res = await pipeline({
    execFunc: () => deleteGroup(id),
  });
  return Response.json(res);
}
