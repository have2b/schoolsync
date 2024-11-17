import { pipeline } from '@/server';
import { updateGrades } from '@/server/grade';

export async function PUT(req: Request) {
  const updateGradesReq = await req.json();
  const res = await pipeline({
    execFunc: () => updateGrades(updateGradesReq),
  });
  return Response.json(res);
}
