import type { Metadata } from 'next';
import { Inria_Sans } from 'next/font/google';

import { Header } from '@/components/layout/header';

import './globals.css';

const inriaSans = Inria_Sans({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-inria-sans',
  weight: '400',
});

export const metadata: Metadata = {
  description: 'Plataforma de organização financeira',
  title: 'MyLedger',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={inriaSans.variable} lang="pt-br">
      <body className="antialiased">
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
