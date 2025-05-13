import { z } from 'zod';

// Regex para validar a senha: pelo menos 8 caracteres, uma letra maiúscula, uma letra minúscula, um número e um caractere especial
const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).*$/;

export const signUpSchema = z
  .object({
    confirmacaoSenha: z.string(),
    email: z.string().email(),
    nome: z.string().min(1),
    senha: z
      .string()
      .min(8)
      .regex(
        passwordRegex,
        'Senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial.'
      ),
  })
  .refine((data) => data.senha === data.confirmacaoSenha, {
    message: 'As senhas não coincidem.',
    path: ['confirmacaoSenha'],
  });

export type SignUpData = z.infer<typeof signUpSchema>;
