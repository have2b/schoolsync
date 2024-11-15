import { pipeline } from '@/server';
import { getCourses } from '@/server/course';

export async function GET() {
  const res = await pipeline({
    execFunc: () => getCourses(),
  });
  return Response.json(res);
}
