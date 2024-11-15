import { pipeline } from '@/server';
import { deleteStudent } from '@/server/student';

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  const res = await pipeline({
    execFunc: () => deleteStudent(id),
  });
  return Response.json(res);
}
