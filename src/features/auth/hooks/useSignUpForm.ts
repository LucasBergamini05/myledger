import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { AlertTheme } from '@/components/ui/alert';
import { SignUpData, signUpSchema } from '@/schemas/user.schema';

export const useSignUpForm = () => {
  const router = useRouter();
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

    router.push('/');
    router.refresh();
  };

  return {
    alert,
    form,
    onSubmit,
  };
};
