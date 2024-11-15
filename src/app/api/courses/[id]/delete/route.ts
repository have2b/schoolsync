import { pipeline } from '@/server';
import { deleteCourse } from '@/server/course';

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  const res = await pipeline({
    execFunc: () => deleteCourse(id),
  });
  return Response.json(res);
}
