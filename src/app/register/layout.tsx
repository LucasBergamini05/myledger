import { PageCard } from '@/components/layout/page-card';

export default function RegisterLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <PageCard>{children}</PageCard>;
}
