import { pipeline } from '@/server';
import { bulkDeleteStudent } from '@/server/student';

export async function POST(req: Request) {
  const deleteStudentReq = await req.json();

  const result = await pipeline({
    execFunc: () => bulkDeleteStudent(deleteStudentReq),
  });
  return Response.json(result);
}
