import { cn } from '@/utils/string';

export const PageContainer = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div {...props} className={cn('w-full py-10 p-2 flex items-center justify-center', className)} />
);
