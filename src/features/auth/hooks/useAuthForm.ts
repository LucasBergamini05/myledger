import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { AlertTheme } from '@/components/ui/alert';
import { authSchema, AuthSchemaData } from '@/schemas/auth.schema';

import { AuthFormType } from '../components/auth-form';

export const useAuthForm = (type: AuthFormType) => {
  const router = useRouter();
  const [alert, setAlert] = useState<{ message: string; type: AlertTheme }>();

  const form = useForm<AuthSchemaData>({
    defaultValues: {
      type,
    },
    resolver: zodResolver(authSchema),
  });

  const onSubmit: SubmitHandler<AuthSchemaData> = async (data) => {
    const res = await fetch('/api/auth/' + type, {
      body: JSON.stringify(data),
      method: 'POST',
    });

    const body = await res.json();

    if (!res.ok) return setAlert({ message: body.error, type: 'error' });

    router.push('/');
    router.refresh();
  };

  return {
    alert,
    form,
    onSubmit,
  };
};
