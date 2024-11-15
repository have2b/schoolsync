import { pipeline } from '@/server';
import { bulkDeleteCourse } from '@/server/course';

export async function POST(req: Request) {
  const deleteCourseReq = await req.json();

  const result = await pipeline({
    execFunc: () => bulkDeleteCourse(deleteCourseReq),
  });
  return Response.json(result);
}
