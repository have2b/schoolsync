import { pipeline } from '@/server';
import { getTeacherById } from '@/server/teacher';

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  const res = await pipeline({
    execFunc: () => getTeacherById(id),
  });
  return Response.json(res);
}
