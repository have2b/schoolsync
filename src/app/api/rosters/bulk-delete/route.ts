import { pipeline } from '@/server';
import { bulkDeleteRoster } from '@/server/roster';

export async function POST(req: Request) {
  const deleteRosterReq = await req.json();

  const result = await pipeline({
    execFunc: () => bulkDeleteRoster(deleteRosterReq),
  });
  return Response.json(result);
}
