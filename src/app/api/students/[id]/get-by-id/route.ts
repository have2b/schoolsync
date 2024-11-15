import { pipeline } from '@/server';
import { getStudentById } from '@/server/student';

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  const res = await pipeline({
    execFunc: () => getStudentById(id),
  });
  return Response.json(res);
}
