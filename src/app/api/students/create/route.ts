import { pipeline } from '@/server';
import { createStudent } from '@/server/student';

export async function POST(req: Request) {
  const createStudentReq = await req.json();
  const result = await pipeline({
    execFunc: () => createStudent(createStudentReq),
  });
  return Response.json(result);
}
