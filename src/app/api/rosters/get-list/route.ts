import { pipeline } from '@/server';
import { getRosters } from '@/server/roster';

export async function GET() {
  const res = await pipeline({
    execFunc: () => getRosters(),
  });
  return Response.json(res);
}
