import Link from 'next/link';

import { Profile } from './profile';

export const Header = () => (
  <header className="w-full h-16 p-2 flex items-center justify-between bg-zinc-900 ">
    <h1 className="text-xl">MyLedger</h1>

    <Profile className="flex-1" />
  </header>
);
