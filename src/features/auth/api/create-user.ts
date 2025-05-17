import bcrypt from 'bcryptjs';

import { prisma } from '@/lib/prisma';
import { RegisterSchemaData } from '@/schemas/auth.schema';

import { checkUserEmail } from './check-user-email';

/**
 * Create a new user in the database, hashing the password
 * @param user The user data to create
 * @returns The created user or false if the email already exists
 */
export const createUser = async ({
  email,
  nome,
  senha,
}: Omit<RegisterSchemaData, 'confirmacaoSenha'>) => {
  // Check if user already exists
  if (await checkUserEmail(email)) throw new Error('Email já cadastrado');

  const hashedPassword = await bcrypt.hash(senha, 10);

  return prisma.usuarios.create({
    data: {
      email,
      nome,
      senha_hash: hashedPassword,
    },
  });
};
