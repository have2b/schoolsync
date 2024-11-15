import { pipeline } from '@/server';
import { createCourse } from '@/server/course';

// Create course
export async function POST(req: Request) {
  const createCourseReq = await req.json();
  const result = await pipeline({
    execFunc: () => createCourse(createCourseReq),
  });
  return Response.json(result);
}
