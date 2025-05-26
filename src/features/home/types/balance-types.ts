import { IconifyIcon } from '@iconify/react';

export interface BalanceData {
  balance: BalanceDetails;
  expense: BalanceDetails;
  income: BalanceDetails;
}
export interface BalanceDetails {
  bgColor: string;
  icon: IconifyIcon;
  textColor: string;
  title: string;
  value: string;
}
