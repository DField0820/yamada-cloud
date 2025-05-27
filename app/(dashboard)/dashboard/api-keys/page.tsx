'use client';

import { useActionState, useState } from 'react';
import useSWR from 'swr';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Copy, Check, Trash2 } from 'lucide-react';
import { createApiKey, deleteApiKey } from '@/app/(login)/actions';

const fetcher = (url: string) => fetch(url).then(res => res.json());

type ApiKey = {
  key: string;
  userId: number;
  name: string | null;
  timestamp: string;
};

export default function ApiKeysPage() {
  const { data, mutate } = useSWR<{ apiKeys: ApiKey[] }>('/api/api-keys', fetcher);
  const [state, formAction, isPending] = useActionState<any, FormData>(createApiKey, {});
  const [, deleteAction] = useActionState<any, FormData>(deleteApiKey, {});
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (key: string) => {
    navigator.clipboard.writeText(key);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <section className="flex-1 p-4 lg:p-8">
      <h1 className="text-lg lg:text-2xl font-medium text-gray-900 mb-6">API Keys</h1>
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Create API Key</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            action={async (fd) => {
              await formAction(fd);
              mutate();
            }}
            className="space-y-4"
          >
            <div>
              <Label htmlFor="name" className="mb-2">Name</Label>
              <Input id="name" name="name" placeholder="Key name" required />
            </div>
            {state?.newKey && (
              <div className="flex items-center justify-between bg-gray-100 p-2 rounded">
                <p className="font-mono break-all mr-2">{state.newKey}</p>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  aria-label="Copy new key"
                  onClick={() => handleCopy(state.newKey)}
                >
                  {copiedKey === state.newKey ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            )}
            {state?.error && <p className="text-red-500 text-sm">{state.error}</p>}
            <Button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white" disabled={isPending}>
              {isPending ? 'Creating...' : 'Create Key'}
            </Button>
          </form>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Existing Keys</CardTitle>
        </CardHeader>
        <CardContent>
          {data?.apiKeys?.length ? (
            <ul className="space-y-4">
              {data.apiKeys.map((k) => (
                <li key={k.key} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{k.name || 'Unnamed Key'}</p>
                    <p className="text-sm text-muted-foreground">
                      {k.key.slice(0, 4)}...{k.key.slice(-4)}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button type="button" variant="outline" size="icon" onClick={() => handleCopy(k.key)}>
                      {copiedKey === k.key ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                    <form
                      action={async (fd) => {
                        await deleteAction(fd);
                        mutate();
                      }}
                    >
                      <input type="hidden" name="key" value={k.key} />
                      <Button type="submit" variant="outline" size="icon">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </form>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground">No API keys yet.</p>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
