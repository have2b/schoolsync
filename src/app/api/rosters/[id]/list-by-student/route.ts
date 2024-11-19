import { pipeline } from '@/server';
import { getRostersByStudent } from '@/server/roster';

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  const res = await pipeline({
    execFunc: () => getRostersByStudent(id),
  });
  return Response.json(res);
}
