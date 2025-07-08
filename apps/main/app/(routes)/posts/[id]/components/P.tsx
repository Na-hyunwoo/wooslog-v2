import { twMerge } from 'tailwind-merge';

export const P = ({
  children,
  className,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) => {
  return (
    <p id={id} className={twMerge('mb-3 break-keep', className)}>
      {children}
    </p>
  );
};
