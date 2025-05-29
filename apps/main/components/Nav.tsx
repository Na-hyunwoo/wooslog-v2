'use client';

import { Tab } from '@wooslog/ui';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

import { ROUTES } from '../const';

export const Nav = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [activeRoute, setActiveRoute] = useState<string>(pathname);

  useEffect(() => {
    setActiveRoute(pathname);
  }, [pathname]);

  const handleClickTabItem = (route: string) => {
    setActiveRoute(route);
    router.push(route);
  };

  return (
    <nav aria-label="header navigation">
      <Tab>
        {Object.entries(ROUTES).map(([key, route]) => {
          const isActive = activeRoute === route;

          return (
            <Tab.Item
              key={key}
              isActive={isActive}
              onClick={() => handleClickTabItem(route)}
              className="text-sm md:text-base"
            >
              {key.toLocaleLowerCase()}
            </Tab.Item>
          );
        })}
      </Tab>
    </nav>
  );
};
