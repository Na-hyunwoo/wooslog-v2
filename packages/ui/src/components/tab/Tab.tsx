import { useCallback, useState } from 'react';

import { TabContext } from './context';
import { Indicator } from './Indicator';
import { TabItem } from './TabItem';
import { Dimensions, TabProps } from './types';

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
      <div className="relative">
        <Indicator dimensions={dimensions} />
        <ul role="tablist" className="relative flex gap-2 py-4">
          {children}
        </ul>
      </div>
    </TabContext.Provider>
  );
};

Tab.Item = TabItem;
