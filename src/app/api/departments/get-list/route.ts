import { pipeline } from '@/server';
import { getDepartments } from '@/server/department';

export async function GET() {
  const res = await pipeline({
    execFunc: () => getDepartments(),
  });
  return Response.json(res);
}
