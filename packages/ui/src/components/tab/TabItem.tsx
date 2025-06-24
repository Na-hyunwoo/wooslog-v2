import { cva } from 'class-variance-authority';

import { useTabContext } from './context';
import { TabItemProps } from './types';

const tabItemVariants = cva(
  'text-white inline-block w-16 transform-gpu text-center transition-transform duration-200 lg:hover:scale-105 cursor-pointer',
  {
    variants: {
      isActive: {
        true: 'font-bold',
        false: 'lg:hover:font-medium',
      },
    },
    defaultVariants: {
      isActive: false,
    },
  }
);

export const TabItem = ({ isActive, children, onClick, className }: TabItemProps) => {
  const { setRef } = useTabContext();

  return (
    <li
      role="tab"
      className={tabItemVariants({ isActive, className })}
      aria-selected={isActive}
      ref={isActive ? setRef : null}
      onClick={onClick}
    >
      {children}
    </li>
  );
};
