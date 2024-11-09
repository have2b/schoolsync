import { pipeline } from '@/server';
import { deleteDepartment } from '@/server/department';

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  const res = await pipeline({
    execFunc: () => deleteDepartment(id),
  });
  return Response.json(res);
}
