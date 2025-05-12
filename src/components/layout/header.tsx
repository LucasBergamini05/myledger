import Link from 'next/link';

type HeaderOption = {
  label: string;
  path: string;
};

const headerOptions: HeaderOption[] = [
  {
    label: 'Home',
    path: '/',
  },
  {
    label: 'Cadastro',
    path: '/sign-up',
  },
];

export const Header = () => (
  <header className="flex items-center justify-center w-full h-16 bg-zinc-900 p-2 gap-4">
    {headerOptions.map(({ label, path }) => (
      <Link href={path} key={path}>
        {label}
      </Link>
    ))}
  </header>
);
