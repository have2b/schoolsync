import { pipeline } from '@/server';
import { updateTeacher } from '@/server/teacher';

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const updateTeacherReq = await req.json();
  const id = (await params).id;
  const res = await pipeline({
    execFunc: () => updateTeacher(id, updateTeacherReq),
  });
  return Response.json(res);
}
