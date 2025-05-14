'use client';

import AddIcon from '@iconify-icons/fluent/add-12-filled';
import { Icon } from '@iconify/react';
import { Path } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Form, FormField, Input } from '@/components/ui/form';
import { SignUpData, signUpSchema } from '@/schemas/user.schema';

export const SignUpForm = () => (
  <div>
    <h1 className="text-lg text-center">Cadastro</h1>

    <Form onSubmit={(data) => console.log(data)} zodSchema={signUpSchema}>
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

      <Button theme="neutral" type="submit">
        <Icon className="inline" icon={AddIcon} />
        Cadastrar
      </Button>
    </Form>
  </div>
);

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
