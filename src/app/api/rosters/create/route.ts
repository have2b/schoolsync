import { pipeline } from '@/server';
import { createRoster } from '@/server/roster';

// Create course
export async function POST(req: Request) {
  const createRosterReq = await req.json();
  const result = await pipeline({
    execFunc: () => createRoster(createRosterReq),
  });
  return Response.json(result);
}
