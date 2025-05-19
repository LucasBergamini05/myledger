import { Card } from '@/components/layout/card';
import { PageContainer } from '@/components/layout/page-container';

export default function RegisterLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <PageContainer>
      <Card>{children}</Card>
    </PageContainer>
  );
}
