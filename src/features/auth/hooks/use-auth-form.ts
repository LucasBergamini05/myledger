import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { AlertTheme } from '@/components/ui/alert';
import { authSchema, AuthSchemaData } from '@/schemas/auth.schema';

import { authRequest } from '../api/auth-request';
import { AuthFormType } from '../components/auth-form';

export const useAuthForm = (type: AuthFormType) => {
  const router = useRouter();
  const [alert, setAlert] = useState<{ message: string; type: AlertTheme }>();

  const form = useForm<AuthSchemaData>({
    defaultValues: { type },
    resolver: zodResolver(authSchema),
  });

  const onSubmit: SubmitHandler<AuthSchemaData> = async (data) => {
    try {
      await authRequest(data);

      setAlert(undefined);
      router.push('/');
      router.refresh();
    } catch (error) {
      setAlert({ message: String(error), type: 'error' });
    }
  };

  return {
    alert,
    form,
    onSubmit,
  };
};
