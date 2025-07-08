import Link from 'next/link';

import { ROUTES } from '@/const';

export const Logo = () => {
  return (
    <Link
      href={ROUTES.POSTS}
      className="ml-6 transform-gpu text-2xl font-bold transition-transform duration-200 lg:hover:scale-105"
    >
      devna
    </Link>
  );
};
