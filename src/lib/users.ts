import bcrypt from 'bcryptjs';

import { RegisterSchemaData } from '@/schemas/auth.schema';

import { prisma } from './prisma';

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
}; /**
 * Check if the user email already exists in the database
 * @param email The email to check
 * @returns True if the email exists, false otherwise
 */

export const checkUserEmail = async (email: string) => {
  const user = await prisma.usuarios.findUnique({
    where: { email },
  });

  return !!user;
};
