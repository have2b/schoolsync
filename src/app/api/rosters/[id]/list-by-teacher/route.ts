import { pipeline } from '@/server';
import { getRostersByTeacher } from '@/server/roster';

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  const res = await pipeline({
    execFunc: () => getRostersByTeacher(id),
  });
  return Response.json(res);
}
