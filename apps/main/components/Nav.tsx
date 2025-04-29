'use client';

import { Tab } from '@wooslog/ui';
import { usePathname, useRouter } from 'next/navigation';

import { ROUTES } from '../const';

export const Nav = () => {
  const pathname = usePathname();
  const router = useRouter();
  const handleClickTabItem = (route: string) => {
    router.push(route);
  };

  return (
    <nav aria-label="header navigation">
      <Tab>
        {Object.entries(ROUTES).map(([key, route]) => {
          const isActive = pathname === route;

          return (
            <Tab.Item key={key} isActive={isActive} onClick={() => handleClickTabItem(route)}>
              {key.toLocaleLowerCase()}
            </Tab.Item>
          );
        })}
      </Tab>
    </nav>
  );
};
