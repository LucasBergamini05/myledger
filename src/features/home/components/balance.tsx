import { Icon } from '@iconify/react';

import { Card } from '@/components/layout/card';
import { IconContainer } from '@/components/ui/icon-container';
import { cn } from '@/lib/string';
import { TCompleteAccount } from '@/types/database';

import { getBalanceData } from '../lib/balance-data';
import { BalanceData, BalanceDetails as BalanceDetail } from '../types/balance-types';

interface BalanceProps {
  userAccounts: TCompleteAccount[];
}

////////////////////////////////////////////////////////////////////////////////////////////////////

export const Balance = ({ userAccounts }: BalanceProps) => {
  const balanceData = getBalanceData(userAccounts);
  return (
    <>
      <BalanceMobile {...balanceData} />
      <BalanceDesktop {...balanceData} />
    </>
  );
};

////////////////////////////////////////////////////////////////////////////////////////////////////

const BalanceDesktop = (props: BalanceData) => (
  <div className="hidden md:flex gap-6 items-center w-full">
    {Object.values(props).map((item: BalanceDetail) => (
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

const BalanceMobile = ({ balance, expense, income }: BalanceData) => (
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
}: { index: number } & BalanceDetail) => (
  <IconContainer className={cn(textColor, index && 'flex-row-reverse')} key={title}>
    <Icon icon={icon} width="1.75rem" />
    <div className={cn(index ? 'text-right' : 'text-left')}>
      <h3 className="text-[var(--foreground)]">{title}</h3>
      <p className={cn('font-bold', textColor)}>{value}</p>
    </div>
  </IconContainer>
);
