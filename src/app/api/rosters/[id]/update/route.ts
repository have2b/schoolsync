import { pipeline } from '@/server';
import { updateRoster } from '@/server/roster';

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const updateRosterReq = await req.json();
  const id = (await params).id;
  const res = await pipeline({
    execFunc: () => updateRoster(id, updateRosterReq),
  });
  return Response.json(res);
}
