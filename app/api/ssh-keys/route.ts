import { getApiKeysForUser } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  const apiKeys = await getApiKeysForUser();
  return Response.json({ apiKeys });
}
