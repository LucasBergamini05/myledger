import { PageContainer } from '@/components/layout/page-container';

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <PageContainer className="md:w-[95vw] lg:w-[80vw] m-auto">{children}</PageContainer>;
}
