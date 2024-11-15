import { pipeline } from '@/server';
import { updateStudent } from '@/server/student';

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const updateStudentReq = await req.json();
  const id = (await params).id;
  const res = await pipeline({
    execFunc: () => updateStudent(id, updateStudentReq),
  });
  return Response.json(res);
}
