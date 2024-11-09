import { pipeline } from '@/server';
import { getDepartment } from '@/server/department';

// Get department
export async function POST(req: Request) {
  const getDepartmentReq = await req.json();
  const res = await pipeline({
    execFunc: () => getDepartment({ ...getDepartmentReq }),
  });
  return Response.json(res);
}
