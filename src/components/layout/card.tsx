import { cn } from '@/lib/string';

export const Card = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div {...props} className={cn('w-full max-w-md p-6 bg-zinc-900 rounded', className)} />
);
