import { cn } from '@/utils/string';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  theme?: ButtonTheme;
}

export const Button = ({
  children,
  className,
  disabled,
  loading,
  theme,
  type = 'button',
  ...props
}: ButtonProps) => (
  <button
    {...props}
    className={cn(
      'p-2 flex items-center justify-center gap-1 rounded-md transition-all',
      disabled || loading ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
      handleTheme({ disabled, loading, theme }),
      className
    )}
    disabled={disabled || loading}
    type={type}
  >
    {loading && <div className="  "></div>}
    {!loading && children}
  </button>
);

////////////////////////////////////////////////////////////////////////////////////////////////////

interface HandleThemeProps {
  disabled?: boolean;
  loading?: boolean;
  theme?: ButtonTheme;
}

const handleTheme = ({ disabled, loading, theme = 'neutral' }: HandleThemeProps): string => {
  const enabled = !(disabled || loading);
  const themes: Record<ButtonTheme, string> = {
    neutral: cn(
      'bg-zinc-300 text-zinc-800',
      enabled && 'hover:bg-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-600'
    ),

    primary: cn(
      'bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500',
      enabled && 'hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-200'
    ),
  };

  return themes[theme] || themes.primary;
};

export type ButtonTheme = 'neutral' | 'primary';
