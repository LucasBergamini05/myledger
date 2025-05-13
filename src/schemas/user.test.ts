import { describe, expect, it } from 'vitest';

import { signUpSchema } from './user';

describe('signUpSchema', () => {
  it('deve passar com usuário válido', () => {
    const result = signUpSchema.safeParse({
      confirmacaoSenha: 'Aa5#1234',
      email: 'teste@email.com',
      nome: 'Teste',
      senha: 'Aa5#1234',
    });

    expect(result.success).toBe(true);
  });

  it('deve falhar com email inválido', () => {
    const result = signUpSchema.safeParse({
      confirmacaoSenha: 'Aa5#1234',
      email: 'email@',
      nome: 'Teste',
      senha: 'Aa5#1234',
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.format().email?._errors).toContain('Invalid email');
    }
  });

  it('deve falhar com senha fraca', () => {
    const result = signUpSchema.safeParse({
      confirmacaoSenha: '123',
      email: 'teste@email.com',
      nome: 'Teste',
      senha: '123',
    });

    expect(result.success).toBe(false);
  });

  it('deve falhar senhas divergentes', () => {
    const result = signUpSchema.safeParse({
      confirmacaoSenha: 'Asad',
      email: 'teste@email.com',
      nome: 'Teste',
      senha: 'Aa5#1234',
    });

    expect(result.success).toBe(false);
  });
});
