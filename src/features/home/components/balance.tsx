import ArrowDownIcon from '@iconify-icons/fluent/arrow-circle-down-12-filled';
import ArrowUpIcon from '@iconify-icons/fluent/arrow-circle-up-12-filled';
import MoneyIcon from '@iconify-icons/fluent/money-16-filled';
import { Icon, IconifyIcon } from '@iconify/react';

import { Card } from '@/components/layout/card';
import { IconContainer } from '@/components/ui/icon-container';
import { cn } from '@/lib/string';

interface BalanceData {
  bgColor: string;
  icon: IconifyIcon;
  textColor: string;
  title: string;
  value: string;
}

interface BalanceProps {
  balance: BalanceData;
  expense: BalanceData;
  income: BalanceData;
}

////////////////////////////////////////////////////////////////////////////////////////////////////

export const Balance = () => {
  const balanceProps: BalanceProps = {
    balance: {
      bgColor: 'bg-blue-500',
      icon: MoneyIcon,
      textColor: 'text-blue-500',
      title: 'Saldo',
      value: 'R$ 10.000,00',
    },

    income: {
      bgColor: 'bg-green-500',
      icon: ArrowDownIcon,
      textColor: 'text-green-500',
      title: 'Receitas',
      value: 'R$ 20.000,00',
    },

    // eslint-disable-next-line perfectionist/sort-objects
    expense: {
      bgColor: 'bg-red-500',
      icon: ArrowUpIcon,
      textColor: 'text-red-500',
      title: 'Despesas',
      value: 'R$ 10.000,00',
    },
  };

  return (
    <>
      <BalanceMobile {...balanceProps} />
      <BalanceDesktop {...balanceProps} />
    </>
  );
};

////////////////////////////////////////////////////////////////////////////////////////////////////

const BalanceDesktop = (props: BalanceProps) => (
  <div className="hidden md:flex gap-6 items-center w-full">
    {Object.values(props).map((item: BalanceData) => (
      <Card className="p-4 max-w-none" key={item.title}>
        <IconContainer className="justify-start">
          <div className={cn('rounded-full p-3 text-[var(--foreground)] ml-[-2rem]', item.bgColor)}>
            <Icon icon={item.icon} width="2.25rem" />
          </div>

          <div>
            <h2 className="text-xl">{item.title}</h2>
            <p className="text-2xl lg:text-3xl font-bold">{item.value}</p>
          </div>
        </IconContainer>
      </Card>
    ))}
  </div>
);

////////////////////////////////////////////////////////////////////////////////////////////////////

const BalanceMobile = ({ balance, expense, income }: BalanceProps) => (
  <Card className="md:hidden p-4 text-center">
    <IconContainer>
      <Icon icon={balance.icon} width="2rem" />
      <h2 className="text-xl font-bold">{balance.title}</h2>
    </IconContainer>

    <p className="text-2xl font-bold">{balance.value}</p>

    <div className="flex justify-between gap-2 mt-4 text-sm">
      {[income, expense].map((item, index) => (
        <BalanceMobileDetails key={item.title} {...item} index={index} />
      ))}
    </div>
  </Card>
);

////////////////////////////////////////////////////////////////////////////////////////////////////

const BalanceMobileDetails = ({
  icon,
  index,
  textColor,
  title,
  value,
}: { index: number } & BalanceData) => (
  <IconContainer className={cn(textColor, index && 'flex-row-reverse')} key={title}>
    <Icon icon={icon} width="1.75rem" />
    <div className={cn(index ? 'text-right' : 'text-left')}>
      <h3 className="text-[var(--foreground)]">{title}</h3>
      <p className={cn('font-bold', textColor)}>{value}</p>
    </div>
  </IconContainer>
);
