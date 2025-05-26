import { ZodError } from 'zod';

import { handleResponse } from '@/lib/api';
import { createSession } from '@/lib/session';
import { createUser } from '@/lib/users';
import { registerSchema } from '@/schemas/auth.schema';

/**
 * Route to handle user registration
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate request body
    const user = registerSchema.parse(body);

    // Deconstruct the password so it doesn't get sent back
    const { senha_hash, ...newUser } = await createUser(user);

    await createSession(newUser);

    return handleResponse(201, 'Usuário criado com sucesso', {
      user: newUser,
    });
  } catch (error) {
    // Handle ZodError
    if (error instanceof ZodError) return handleResponse(400, 'Dados inválidos', error.errors);

    // Handle email already registered error
    if (error instanceof Error && error.message === 'Email já cadastrado')
      return handleResponse(409, 'Email já cadastrado', error);

    console.error('Erro ao criar usuário: ', error);
    return handleResponse(500, 'Erro interno no servidor');
  }
}
