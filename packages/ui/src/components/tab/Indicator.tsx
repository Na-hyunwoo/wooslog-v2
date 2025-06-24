import { IndicatorProps } from './types';

export const Indicator = ({ dimensions }: IndicatorProps) => {
  if (!dimensions) {
    return null;
  }

  return (
    <div
      className="absolute bottom-0 left-0 h-0.5 transform-gpu bg-white transition-all duration-200"
      style={{
        transform: `translateX(${dimensions.left}px)`,
        width: dimensions.width,
      }}
    />
  );
};
