import { cookies } from 'next/headers';

import { handleResponse } from '@/utils/api';

export async function POST() {
  try {
    const cookieStore = await cookies();

    cookieStore.set('auth_token', '', {
      httpOnly: true,
      maxAge: 0, // Remove o cookie
      path: '/',
    });

    return handleResponse(200, 'Logout realizado');
  } catch (e) {
    console.error(e);
    return handleResponse(500, 'Erro interno no servidor');
  }
}
