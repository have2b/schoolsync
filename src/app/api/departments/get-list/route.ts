import { pipeline } from '@/server';
import { getDepartments } from '@/server/department';

// Get department
export async function POST(req: Request) {
  const getDepartmentReq = await req.json();
  const res = await pipeline({
    execFunc: () => getDepartments({ ...getDepartmentReq }),
  });
  return Response.json(res);
}
