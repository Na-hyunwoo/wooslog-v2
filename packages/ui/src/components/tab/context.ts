import { createContext, useContext } from 'react';

type TabContextType = {
  // eslint-disable-next-line no-unused-vars
  setRef: (element: HTMLLIElement | null) => void;
};

export const TabContext = createContext<TabContextType | null>(null);

export const useTabContext = () => {
  const context = useContext(TabContext);

  if (!context) {
    throw new Error('useTabContext must be used within a Tab component');
  }

  return context;
};
