import { pipeline } from '@/funcs';
import { createDepartment } from '@/funcs/department';

// Create department
export async function POST(req: Request) {
  const createDepartmentReq = await req.json();
  const result = await pipeline({
    execFunc: () => createDepartment(createDepartmentReq),
  });
  return Response.json(result);
}
