import { getApiKeysForUser } from '@/lib/db';

export async function GET() {
  const apiKeys = await getApiKeysForUser();
  return Response.json({ apiKeys });
}
