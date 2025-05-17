import Link from 'next/link';

import { getCurrentUser } from '@/utils/auth';
import { cn } from '@/utils/string';

import { LogoutButton } from './logout-button';

export const Profile = async ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  const user = await getCurrentUser();

  return (
    <div {...props} className={cn('flex justify-end gap-2', className)}>
      {user ? (
        <div className="flex gap-2 items-center">
          Logado
          <LogoutButton className="h-6 w-12" size="sm">
            Sair
          </LogoutButton>
        </div>
      ) : (
        <>
          <Link href="/login">Entrar</Link>
          <Link href="/register">Cadastrar</Link>
        </>
      )}
    </div>
  );
};
