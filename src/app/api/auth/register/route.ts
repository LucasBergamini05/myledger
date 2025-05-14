import { ZodError } from 'zod';

import { createUser } from '@/features/auth/api/create-user';
import { signUpSchema } from '@/schemas/user.schema';
import { handleResponse } from '@/utils/api';

/**
 * Route to handle user registration
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate request body
    const { confirmacaoSenha, ...user } = signUpSchema.parse(body);

    // Destructure password to not send it back
    const { senha_hash, ...newUser } = await createUser(user);

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
