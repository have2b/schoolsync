import { pipeline } from '@/server';
import { getGradesByStudent } from '@/server/grade';

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  const res = await pipeline({
    execFunc: () => getGradesByStudent(id),
  });
  return Response.json(res);
}
