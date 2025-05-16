'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import AddIcon from '@iconify-icons/fluent/add-12-filled';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import { Path, SubmitHandler, useForm } from 'react-hook-form';

import { Alert, AlertTheme } from '@/components/ui/alert';
import { Form, FormField, Input } from '@/components/ui/form';
import { SubmitButton } from '@/components/ui/submit-button';
import { SignUpData, signUpSchema } from '@/schemas/user.schema';

export const SignUpForm = () => {
  const [alert, setAlert] = useState<{ message: string; type: AlertTheme }>();

  const form = useForm<SignUpData>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit: SubmitHandler<SignUpData> = async (data) => {
    const res = await fetch('/api/auth/register', {
      body: JSON.stringify(data),
      method: 'POST',
    });

    const body = await res.json();

    if (!res.ok) return setAlert({ message: body.error, type: 'error' });

    setAlert({ message: 'Cadastro realizado', type: 'sucess' });
    form.reset();
  };

  return (
    <div>
      <h1 className="text-lg text-center">Cadastro</h1>

      <Form form={form} onSubmit={onSubmit}>
        {fields.map((field) => (
          <FormField
            className="mb-4"
            key={field.name}
            label={field.label}
            name={field.name}
            render={(inputProps) => (
              <Input {...inputProps} placeholder={field.placeholder} type={field.type} />
            )}
          />
        ))}

        {alert && <Alert theme={alert.type}>{alert.message}</Alert>}

        <SubmitButton className="w-full" theme="primary">
          <Icon className="inline" icon={AddIcon} />
          Cadastrar
        </SubmitButton>
      </Form>
    </div>
  );
};

////////////////////////////////////////////////////////////////////////////////////////////////////

type Field = {
  label: string;
  name: Path<SignUpData>;
  placeholder: string;
  type: 'email' | 'password' | 'text';
};

const fields: Field[] = [
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
