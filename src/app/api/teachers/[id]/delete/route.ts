import { pipeline } from '@/server';
import { deleteTeacher } from '@/server/teacher';

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  const res = await pipeline({
    execFunc: () => deleteTeacher(id),
  });
  return Response.json(res);
}
