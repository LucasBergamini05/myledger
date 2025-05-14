import { describe, expect, it, vi } from 'vitest';

import { prisma } from '@/lib/prisma';

import { createUser } from './create-user';

describe('checkUserEmail', () => {
  // Mocking the Prisma client
  // This is a mock of the Prisma client to avoid hitting the database during tests
  vi.mock('@/lib/prisma', () => ({
    prisma: {
      usuarios: {
        create: vi.fn(),
        findUnique: vi.fn(),
      },
    },
  }));

  // Mock data for the create method
  const mockedCreateResponse = {
    ativo: true,
    data_criacao: new Date(),
    email: 'naoexiste@teste.com',
    id: 1,
    nome: 'Teste',
    senha_hash: 'hash',
    ultimo_login: new Date(),
  };

  // Mocking the create method of the usuarios model
  vi.mocked(prisma.usuarios.create).mockResolvedValueOnce(mockedCreateResponse);

  it('should return the user data', async () => {
    const result = await createUser({
      email: 'naoexiste@teste.com',
      nome: 'Teste',
      senha: 'senha',
    });

    expect(result).toEqual(mockedCreateResponse);
  });

  it('should not create user with duplicate email', async () => {
    // Mock data for the create method
    const mockedFindUniqueResponse = {
      ativo: true,
      data_criacao: new Date(),
      email: 'existe@teste.com',
      id: 1,
      nome: 'Teste',
      senha_hash: 'hash',
      ultimo_login: new Date(),
    };

    // Mocking the findUnique method for duplicate email testing
    vi.mocked(prisma.usuarios.findUnique).mockResolvedValueOnce(mockedFindUniqueResponse);

    await expect(
      createUser({
        email: 'naoexiste@teste.com',
        nome: 'Teste',
        senha: 'senha',
      })
    ).rejects.toThrow('Email já cadastrado');
  });
});
