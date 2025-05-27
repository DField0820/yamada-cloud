import { getTeamForUser } from '@/lib/db';

export async function GET() {
  const team = await getTeamForUser();
  return Response.json(team);
}
