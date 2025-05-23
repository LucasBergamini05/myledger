import { describe, expect, it, vi } from 'vitest';

import { prisma } from '@/lib/prisma';
import { checkUserEmail, createUser } from '@/lib/users';

const mockedUser = {
  ativo: true,
  data_criacao: new Date(),
  email: 'existe@teste.com',
  id: 1,
  nome: 'Teste',
  senha_hash: 'hash',
  ultimo_login: new Date(),
};

vi.mock('@/lib/prisma', () => ({
  prisma: {
    usuarios: {
      create: vi.fn(),
      findUnique: vi.fn(),
    },
  },
}));

describe('createUser', () => {
  it('should create and return the user data if email does not exist', async () => {
    vi.mocked(prisma.usuarios.findUnique).mockResolvedValueOnce(null);
    vi.mocked(prisma.usuarios.create).mockResolvedValueOnce(mockedUser);

    const result = await createUser({
      email: 'naoexiste@teste.com',
      nome: 'Teste',
      senha: 'senha',
    });

    expect(result).toEqual(mockedUser);
  });

  it('should throw an error if email already exists', async () => {
    vi.mocked(prisma.usuarios.findUnique).mockResolvedValueOnce(mockedUser);

    await expect(
      createUser({
        email: 'existe@teste.com',
        nome: 'Teste',
        senha: 'senha',
      })
    ).rejects.toThrow('Email já cadastrado');
  });
});

describe('checkUserEmail', () => {
  it('should return true if email exists', async () => {
    vi.mocked(prisma.usuarios.findUnique).mockResolvedValueOnce(mockedUser);

    const result = await checkUserEmail('existe@teste.com');
    expect(result).toBe(true);
  });

  it('should return false if email does not exist', async () => {
    vi.mocked(prisma.usuarios.findUnique).mockResolvedValueOnce(null);

    const result = await checkUserEmail('naoexiste@teste.com');
    expect(result).toBe(false);
  });
});
