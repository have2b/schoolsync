import { pipeline } from '@/server';
import { bulkDeleteTeacher } from '@/server/teacher';

export async function POST(req: Request) {
  const deleteTeacherReq = await req.json();

  const result = await pipeline({
    execFunc: () => bulkDeleteTeacher(deleteTeacherReq),
  });
  return Response.json(result);
}
