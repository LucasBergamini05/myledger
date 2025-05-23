'use client';

import { Alert } from '@/components/ui/alert';
import { Form, FormFieldRender, TFormField } from '@/components/ui/form';
import { SubmitButton } from '@/components/ui/submit-button';
import { LoginSchemaData, RegisterSchemaData } from '@/schemas/auth.schema';

import { useAuthForm } from '../hooks/use-auth-form';

export type AuthFormType = 'login' | 'register';

interface AuthFormProps {
  type: AuthFormType;
}

/**
 * Authentication Form
 * Renders a different form depending on the type parameter
 * @param type Login or register
 */
export const AuthForm = ({ type }: AuthFormProps) => {
  const { alert, form, onSubmit } = useAuthForm(type);

  return (
    <div>
      <h1 className="text-lg text-center">{type == 'login' ? 'Entrar' : 'Cadastrar'}</h1>

      <Form form={form} onSubmit={onSubmit}>
        {type == 'login' ? (
          <FormFieldRender fields={loginFields} />
        ) : (
          <FormFieldRender fields={registerFields} />
        )}

        {alert && <Alert theme={alert.type}>{alert.message}</Alert>}

        <SubmitButton className="w-full" theme="primary">
          Enviar
        </SubmitButton>
      </Form>
    </div>
  );
};

////////////////////////////////////////////////////////////////////////////////////////////////////

const loginFields: TFormField<LoginSchemaData>[] = [
  {
    label: 'Email',
    name: 'email',
    placeholder: 'Insira seu email',
    type: 'email',
  },

  {
    label: 'Senha',
    name: 'senha',
    placeholder: 'Insira sua senha',
    type: 'password',
  },
];

const registerFields: TFormField<RegisterSchemaData>[] = [
  {
    label: 'Nome',
    name: 'nome',
    placeholder: 'Insira seu nome',
    type: 'text',
  },
  {
    label: 'Email',
    name: 'email',
    placeholder: 'Insira seu e-mail',
    type: 'email',
  },
  {
    label: 'Senha',
    name: 'senha',
    placeholder: 'Insira sua senha',
    type: 'password',
  },
  {
    label: 'Confirmação de Senha',
    name: 'confirmacaoSenha',
    placeholder: 'Confirme sua senha',
    type: 'password',
  },
];
