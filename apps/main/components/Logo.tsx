import Link from 'next/link';

import { ROUTES } from '../const';

export const Logo = () => {
  return (
    <Link
      href={ROUTES.HOME}
      className="ml-6 transform-gpu text-2xl font-bold transition-transform duration-200 hover:scale-105"
    >
      wooslog
    </Link>
  );
};
