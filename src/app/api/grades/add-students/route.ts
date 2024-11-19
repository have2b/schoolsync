import { pipeline } from '@/server';
import { addStudentGrades } from '@/server/grade';

export async function POST(req: Request) {
  const addStudentsReq = await req.json();
  const res = await pipeline({
    execFunc: () => addStudentGrades(addStudentsReq),
  });
  return Response.json(res);
}
