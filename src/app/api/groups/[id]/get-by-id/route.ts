import { pipeline } from '@/server';
import { getGroupById } from '@/server/group';

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  const res = await pipeline({
    execFunc: () => getGroupById(id),
  });
  return Response.json(res);
}
