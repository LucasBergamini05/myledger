import { cn } from '@/utils/string';

export const IconContainer = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div {...props} className={cn('flex items-center justify-center gap-2', className)} />
);
