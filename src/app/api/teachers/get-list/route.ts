import { pipeline } from '@/server';
import { getTeachers } from '@/server/teacher';

export async function GET() {
  const res = await pipeline({
    execFunc: () => getTeachers(),
  });
  return Response.json(res);
}
