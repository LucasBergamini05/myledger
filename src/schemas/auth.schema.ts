import { z } from 'zod';

import { requiredStringSchema } from './generics.schema';

// Regex para validar a senha: pelo menos 8 caracteres, uma letra maiúscula, uma letra minúscula, um número e um caractere especial
const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).*$/;

export const loginSchema = z.object({
  email: requiredStringSchema('O email é obrigatório').email('Insira um email válido'),
  senha: requiredStringSchema('A senha é obrigatória'),
});

export const registerSchema = z.object({
  confirmacaoSenha: requiredStringSchema('A confirmação de senha é obrigatória'),
  email: requiredStringSchema('O email é obrigatório').email('Insira um e-mail válido'),
  nome: requiredStringSchema('O nome é obrigatório'),
  senha: requiredStringSchema('A senha é obrigatória')
    .min(8, 'A senha deve ter pelo menos 8 caracteres')
    .regex(
      passwordRegex,
      'Senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial.'
    ),
});

export const authSchema = z
  .discriminatedUnion('type', [
    z.object({ type: z.literal('login') }).merge(loginSchema),
    z.object({ type: z.literal('register') }).merge(registerSchema),
  ])
  .refine((data) => data.type != 'register' || data.senha === data.confirmacaoSenha, {
    message: 'As senhas não coincidem.',
    path: ['confirmacaoSenha'],
  });

export type AuthSchemaData = z.infer<typeof authSchema>;
export type LoginSchemaData = z.infer<typeof loginSchema>;
export type RegisterSchemaData = z.infer<typeof registerSchema>;
