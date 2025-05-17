import { describe, expect, it } from 'vitest';

import { authSchema, loginSchema, registerSchema } from './auth.schema';

describe('registerSchema', () => {
  it('deve passar com usuário válido', () => {
    const result = registerSchema.safeParse({
      confirmacaoSenha: 'Aa5#1234',
      email: 'teste@email.com',
      nome: 'Teste',
      senha: 'Aa5#1234',
    });

    expect(result.success).toBe(true);
  });

  it('deve falhar com email inválido', () => {
    const result = registerSchema.safeParse({
      confirmacaoSenha: 'Aa5#1234',
      email: 'email@',
      nome: 'Teste',
      senha: 'Aa5#1234',
    });

    expect(result.success).toBe(false);
  });

  it('deve falhar com senha fraca', () => {
    const result = registerSchema.safeParse({
      confirmacaoSenha: '123',
      email: 'teste@email.com',
      nome: 'Teste',
      senha: '123',
    });

    expect(result.success).toBe(false);
  });
});

describe('loginSchema', () => {
  it('deve passar com usuário válido', () => {
    const result = loginSchema.safeParse({
      email: 'teste@email.com',
      senha: 'Aa5#1234',
    });

    expect(result.success).toBe(true);
  });

  it('deve falhar com email inválido', () => {
    const result = loginSchema.safeParse({
      email: 'teste',
      senha: 'Aa5#1234',
    });

    expect(result.success).toBe(false);
  });

  it('deve falhar com campos vazios', () => {
    const result = loginSchema.safeParse({
      email: '',
      senha: '',
    });

    expect(result.success).toBe(false);
  });
});

describe('authSchema', () => {
  it('deve passar com cadastro válido', () => {
    const result = authSchema.safeParse({
      confirmacaoSenha: 'Aa5#1234',
      email: 'teste@email.com',
      nome: 'Teste',
      senha: 'Aa5#1234',
      type: 'register',
    });

    expect(result.success).toBe(true);
  });

  it('deve passar com login válido', () => {
    const result = authSchema.safeParse({
      email: 'teste@email.com',
      senha: 'Aa5#1234',
      type: 'login',
    });

    expect(result.success).toBe(true);
  });

  it('deve falhar com senhas divergentes', () => {
    const result = authSchema.safeParse({
      confirmacaoSenha: 'Aa',
      email: 'teste@email.com',
      nome: 'Teste',
      senha: 'Aa5#1234',
      type: 'register',
    });

    expect(result.success).toBe(false);
  });
});
