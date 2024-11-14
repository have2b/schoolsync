import { pipeline } from '@/server';
import { bulkDeleteDepartment } from '@/server/department';

export async function POST(req: Request) {
  const deleteDepartmentReq = await req.json();

  const result = await pipeline({
    execFunc: () => bulkDeleteDepartment(deleteDepartmentReq),
  });
  return Response.json(result);
}
