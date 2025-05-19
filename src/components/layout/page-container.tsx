import { cn } from '@/utils/string';

export const PageContainer = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    {...props}
    className={cn('w-full p-2 py-10 flex flex-col items-center justify-center gap-10', className)}
  />
);
