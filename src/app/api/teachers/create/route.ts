import { pipeline } from '@/server';
import { createTeacher } from '@/server/teacher';

export async function POST(req: Request) {
  const createTeacherReq = await req.json();
  const result = await pipeline({
    execFunc: () => createTeacher(createTeacherReq),
  });
  return Response.json(result);
}
