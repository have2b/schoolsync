import { pipeline } from '@/server';
import { getStudents } from '@/server/student';

export async function GET() {
  const res = await pipeline({
    execFunc: () => getStudents(),
  });
  return Response.json(res);
}
