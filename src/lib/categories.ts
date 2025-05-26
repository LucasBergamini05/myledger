import { prisma } from './prisma';

export const getUserCategories = async (userId: number) => {
  const contas = await prisma.categorias.findMany({
    where: { id_usuario: userId },
  });

  return contas;
};
