import { pipeline } from '@/server';
import { updateDepartment } from '@/server/department';

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const updateDepartmentReq = await req.json();
  const id = (await params).id;
  const res = await pipeline({
    execFunc: () => updateDepartment(id, updateDepartmentReq),
  });
  return Response.json(res);
}
