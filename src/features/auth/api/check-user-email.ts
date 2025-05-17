import { prisma } from '@/lib/prisma';

/**
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
