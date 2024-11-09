import { pipeline } from '@/server';
import { getDepartmentById } from '@/server/department';

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  const res = await pipeline({
    execFunc: () => getDepartmentById(id),
  });
  return Response.json(res);
}
