import Link from 'next/link';

import { LogoutButton } from '@/features/auth/components/logout-button';
import { getCurrentUser } from '@/utils/auth';
import { cn } from '@/utils/string';

export const Profile = async ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  const user = await getCurrentUser();

  return (
    <div {...props} className={cn('flex justify-end gap-2', className)}>
      {user ? (
        <div className="flex gap-2 items-center">
          Logado
          <LogoutButton className="min-h-6 h-6">Sair</LogoutButton>
        </div>
      ) : (
        <>
          <Link href="/">Entrar</Link>
          <Link href="/sign-up">Cadastrar</Link>
        </>
      )}
    </div>
  );
};
