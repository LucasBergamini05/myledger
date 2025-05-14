import { describe, expect, it, Mock, vi } from 'vitest';

import { prisma } from '@/lib/prisma';

import { checkUserEmail } from './check-user-email';

describe('checkUserEmail', () => {
  // Mocking the Prisma client
  // This is a mock of the Prisma client to avoid hitting the database during tests
  vi.mock('@/lib/prisma', () => ({
    prisma: {
      usuarios: {
        findUnique: vi.fn(),
      },
    },
  }));

  // Mocking the findUnique method of the usuarios model
  vi.mocked(prisma.usuarios.findUnique).mockResolvedValueOnce({
    ativo: true,
    data_criacao: new Date(),
    email: 'teste@teste.com',
    id: 1,
    nome: 'Teste',
    senha_hash: 'hash',
    ultimo_login: new Date(),
  });

  it('should return true if email exists', async () => {
    const result = await checkUserEmail('existe@teste.com');
    expect(result).toBe(true);
  });

  it('should return false if email does not exist', async () => {
    const result = await checkUserEmail('naoexiste@teste.com');
    expect(result).toBe(false);
  });
});
