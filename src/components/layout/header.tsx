import Link from 'next/link';

import { Profile } from './profile';

type HeaderOption = {
  label: string;
  path: string;
};

const headerOptions: HeaderOption[] = [
  {
    label: 'Home',
    path: '/',
  },
];

export const Header = () => (
  <header className="w-full h-16 p-2 flex items-center justify-between bg-zinc-900 ">
    <div className="flex-1" />

    <div className="flex items-center justify-center gap-4">
      {headerOptions.map(({ label, path }) => (
        <Link href={path} key={path}>
          {label}
        </Link>
      ))}
    </div>

    <Profile className="flex-1" />
  </header>
);
