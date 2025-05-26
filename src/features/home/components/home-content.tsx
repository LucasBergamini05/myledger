import { redirect } from 'next/navigation';

import { getUserAccounts } from '@/lib/accounts';
import { getUserCategories } from '@/lib/categories';
import { getCurrentUser } from '@/lib/session';

import { Balance } from './balance';
import { DistributionChart } from './distribution-chart';

export const HomeContent = async () => {
  const user = await getCurrentUser();

  if (!user) redirect('/login');

  const accounts = await getUserAccounts(Number(user.id));
  const categories = await getUserCategories(Number(user.id));

  return (
    <>
      <Balance userAccounts={accounts} />
      <DistributionChart userAccounts={accounts} userCategories={categories} />
    </>
  );
};
