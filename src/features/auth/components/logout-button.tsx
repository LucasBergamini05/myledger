'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Button, ButtonProps } from '@/components/ui/button';

export const LogoutButton = ({ onClick, ...props }: Omit<ButtonProps, 'loading'>) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
    setLoading(true);

    await fetch('/api/auth/logout', { method: 'POST' });

    router.push('/');
    router.refresh();

    onClick?.(e);
  };

  return (
    <Button {...props} loading={loading} onClick={handleLogout}>
      Sair
    </Button>
  );
};
