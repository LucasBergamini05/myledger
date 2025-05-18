import { usuarios } from '@prisma/client';
import { jwtVerify, SignJWT } from 'jose';
import { cookies } from 'next/headers';

/**
 * Function to create a JWT session
 * @param user User data
 */
export const createSession = async ({
  email,
  id,
  nome,
}: Pick<usuarios, 'email' | 'id' | 'nome'>) => {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

  const token = await new SignJWT({ email, nome })
    .setProtectedHeader({ alg: 'HS256' })
    .setSubject(id.toString())
    .setExpirationTime('1d')
    .sign(secret);

  (await cookies()).set('auth_token', token, {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7, // 7 dias
    path: '/',
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  });
};

/**
 * Function to get the current user
 * @returns user User data
 */
export const getCurrentUser = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth_token')?.value;

  if (!token) return null;

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
    const { payload } = await jwtVerify(token, secret);

    return {
      email: payload.email as string,
      id: payload.sub as string,
      nome: payload.nome as string,
    };
  } catch (e) {
    console.error('Erro ao verificar token:', e);
    return null;
  }
};
