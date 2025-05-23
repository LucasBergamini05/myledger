import { AuthSchemaData } from '@/schemas/auth.schema';

export const authRequest = async ({ type, ...data }: AuthSchemaData) => {
  const res = await fetch('/api/auth/' + type, {
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
  });

  const body = await res.json();

  if (!res.ok) throw new Error(body.error);

  return body;
};
