import ArrowDownIcon from '@iconify-icons/fluent/arrow-circle-down-12-filled';
import ArrowUpIcon from '@iconify-icons/fluent/arrow-circle-up-12-filled';
import MoneyIcon from '@iconify-icons/fluent/money-16-filled';

import { formatCurrency } from '@/lib/string';
import { TCompleteAccount } from '@/types/database';

import { BalanceData } from '../types/balance-types';

export const getBalanceData = (userAccounts: TCompleteAccount[]): BalanceData => {
  const totalIncome = getTotal(userAccounts, 'e');
  const totalExpense = getTotal(userAccounts, 's');
  const totalBalance = totalIncome - totalExpense;

  return {
    balance: {
      bgColor: 'bg-blue-500',
      icon: MoneyIcon,
      textColor: 'text-blue-500',
      title: 'Saldo',
      value: formatCurrency(totalBalance),
    },

    income: {
      bgColor: 'bg-green-500',
      icon: ArrowDownIcon,
      textColor: 'text-green-500',
      title: 'Receitas',
      value: formatCurrency(totalIncome),
    },

    // eslint-disable-next-line perfectionist/sort-objects
    expense: {
      bgColor: 'bg-red-500',
      icon: ArrowUpIcon,
      textColor: 'text-red-500',
      title: 'Despesas',
      value: formatCurrency(totalExpense),
    },
  };
};

const getTotal = (userAccounts: TCompleteAccount[], type: 'e' | 's') => {
  return userAccounts.reduce((acc, account) => {
    const total = account.transacoes.reduce(
      (sum, transaction) => (transaction.tipo === type ? sum + transaction.valor : sum),
      0
    );
    return acc + total;
  }, 0);
};
