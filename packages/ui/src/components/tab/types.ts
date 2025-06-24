import { ReactNode } from 'react';

export type TabProps = {
  children: ReactNode;
};

export type TabItemProps = {
  isActive: boolean;
  children: ReactNode;
  onClick?: () => void;
  className?: string;
};
export type Dimensions = {
  width: number;
  left: number;
};

export type IndicatorProps = {
  dimensions: Dimensions | null;
};
