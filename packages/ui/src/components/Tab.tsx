import { createContext, ReactNode, useCallback, useContext, useState } from 'react';

type TabContextType = {
  // eslint-disable-next-line no-unused-vars
  setRef: (element: HTMLLIElement | null) => void;
};

const TabContext = createContext<TabContextType | null>(null);

const useTabContext = () => {
  const context = useContext(TabContext);

  if (!context) {
    throw new Error('useTabContext must be used within a Tab component');
  }

  return context;
};

type TabProps = {
  children: ReactNode;
};

export const Tab = ({ children }: TabProps) => {
  const [dimensions, setDimensions] = useState<Dimensions | null>(null);

  const setRef = useCallback((element: HTMLLIElement | null) => {
    if (!element) {
      return;
    }

    setDimensions({
      left: element.offsetLeft,
      width: element.offsetWidth,
    });
  }, []);

  return (
    <TabContext.Provider value={{ setRef }}>
      <ul role="tablist" className="relative flex gap-2 py-4">
        <Indicator dimensions={dimensions} />
        {children}
      </ul>
    </TabContext.Provider>
  );
};

type TabItemProps = {
  isActive: boolean;
  children: ReactNode;
  onClick?: () => void;
  className?: string;
};

export const TabItem = ({ isActive, children, onClick, className }: TabItemProps) => {
  const { setRef } = useTabContext();

  return (
    <li
      role="tab"
      className={`inline-block w-16 transform-gpu text-center transition-transform duration-200 lg:hover:scale-105 ${isActive ? 'font-bold text-[#333d4b]' : 'text-[#6b7684] lg:hover:font-medium'} ${onClick ? 'cursor-pointer' : ''} ${className}`}
      aria-selected={isActive}
      ref={isActive ? setRef : null}
      onClick={onClick}
    >
      {children}
    </li>
  );
};

Tab.Item = TabItem;

type Dimensions = {
  width: number;
  left: number;
};

type IndicatorProps = {
  dimensions: Dimensions | null;
};

const Indicator = ({ dimensions }: IndicatorProps) => {
  if (!dimensions) {
    return null;
  }

  return (
    <div
      className="absolute bottom-0 left-0 h-0.5 transform-gpu bg-black transition-all duration-200"
      style={{
        transform: `translateX(${dimensions.left}px)`,
        width: dimensions.width,
      }}
    />
  );
};
