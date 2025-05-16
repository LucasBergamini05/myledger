import SucessIcon from '@iconify-icons/fluent/checkmark-circle-12-regular';
import ErrorIcon from '@iconify-icons/fluent/error-circle-12-regular';
import InfoIcon from '@iconify-icons/fluent/info-12-regular';
import WarnIcon from '@iconify-icons/fluent/warning-12-regular';
import { Icon } from '@iconify/react';

import { cn } from '@/utils/string';

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  theme?: AlertTheme;
}

export const Alert = ({ children, className, theme = 'info', ...props }: AlertProps) => (
  <div
    {...props}
    className={cn('flex items-center gap-2 border-2 rounded p-3', themes[theme], className)}
  >
    {icons[theme]}
    {children}
  </div>
);

////////////////////////////////////////////////////////////////////////////////////////////////////

export type AlertTheme = 'error' | 'info' | 'sucess' | 'warn';

const themes: Record<AlertTheme, string> = {
  error: cn('text-red-200 bg-red-900/10 border-red-900'),
  info: cn('text-blue-200 bg-blue-900/10 border-blue-900'),
  sucess: cn('text-green-200 bg-green-900/10 border-green-900'),
  warn: cn('text-yellow-200 bg-yellow-900/10 border-yellow-900'),
};

const icons: Record<AlertTheme, React.ReactNode> = {
  error: <Icon className="text-red-700" icon={ErrorIcon} width={'1.5rem'} />,
  info: <Icon className="text-blue-700" icon={InfoIcon} width={'1.5rem'} />,
  sucess: <Icon className="text-green-600" icon={SucessIcon} width={'1.5rem'} />,
  warn: <Icon className="text-yellow-600" icon={WarnIcon} width={'1.5rem'} />,
};
