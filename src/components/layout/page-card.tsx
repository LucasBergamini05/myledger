import { cn } from '@/utils/string';

interface PageCardProps {
  cardClassName?: string;
  children: React.ReactNode;
  containerClassName?: string;
}

export const PageCard = ({ cardClassName, children, containerClassName }: PageCardProps) => (
  <div className={cn('w-full py-10 flex items-center justify-center', containerClassName)}>
    <div className={cn('w-full max-w-md p-6 bg-zinc-900 rounded', cardClassName)}>{children}</div>
  </div>
);
