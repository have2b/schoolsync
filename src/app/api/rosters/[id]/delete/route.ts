import { pipeline } from '@/server';
import { deleteRoster } from '@/server/roster';

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  const res = await pipeline({
    execFunc: () => deleteRoster(id),
  });
  return Response.json(res);
}
