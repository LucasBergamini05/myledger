import { prisma } from './prisma';

export const getUserAccounts = async (userId: number) => {
  const contas = await prisma.contas.findMany({
    include: { transacoes: true },
    where: { id_usuario: userId },
  });

  return contas.map((conta) => {
    return {
      ...conta,
      transacoes: conta.transacoes.map((transacao) => ({
        ...transacao,
        valor: transacao.valor / 100,
      })),
    };
  });
};
