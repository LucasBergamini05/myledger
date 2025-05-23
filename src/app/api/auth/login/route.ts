import { compare } from 'bcryptjs';
import { ZodError } from 'zod';

import { prisma } from '@/lib/prisma';
import { loginSchema } from '@/schemas/auth.schema';
import { handleResponse } from '@/lib/api';
import { createSession } from '@/lib/session';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { email, senha } = loginSchema.parse(body);

    const user = await prisma.usuarios.findUnique({ where: { email } });

    if (!user || !(await compare(senha, user.senha_hash)))
      return handleResponse(401, 'Credenciais inválidas');

    await createSession(user);

    return handleResponse(200, 'Login realizado com sucesso');
  } catch (error) {
    // Handle ZodError
    if (error instanceof ZodError) return handleResponse(401, 'Credenciais inválidas');

    console.error('Erro ao realizar login: ', error);
    return handleResponse(500, 'Erro interno no servidor');
  }
}
