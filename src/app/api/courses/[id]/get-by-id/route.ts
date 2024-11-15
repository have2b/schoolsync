import { pipeline } from '@/server';
import { getCourseById } from '@/server/course';

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  const res = await pipeline({
    execFunc: () => getCourseById(id),
  });
  return Response.json(res);
}
