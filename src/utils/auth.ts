import { usuarios } from '@prisma/client';
import jwt from 'jsonwebtoken';
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
  const token = jwt.sign({ email, nome, sub: id }, process.env.JWT_SECRET!, { expiresIn: '1d' });
  console.log(token);
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

  if (token)
    try {
      return jwt.verify(token, process.env.JWT_SECRET!);
    } catch (e) {
      console.error(e);
    }

  return null;
};
