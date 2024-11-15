import { pipeline } from '@/server';
import { updateCourse } from '@/server/course';

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const updateCourseReq = await req.json();
  const id = (await params).id;
  const res = await pipeline({
    execFunc: () => updateCourse(id, updateCourseReq),
  });
  return Response.json(res);
}
