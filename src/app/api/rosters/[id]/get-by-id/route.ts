import { pipeline } from '@/server';
import { getRosterById } from '@/server/roster';

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  const res = await pipeline({
    execFunc: () => getRosterById(id),
  });
  return Response.json(res);
}
