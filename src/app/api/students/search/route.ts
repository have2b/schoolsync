import { pipeline } from '@/server';
import { searchStudents } from '@/server/student';

export async function POST(req: Request) {
  const searchReq = await req.json();
  const result = await pipeline({
    execFunc: () => searchStudents(searchReq),
  });
  return Response.json(result);
}
