import { twMerge } from 'tailwind-merge';

export const Pre = ({
  children,
  className,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) => {
  return (
    <pre id={id} className={twMerge('mb-6', className)}>
      {children}
    </pre>
  );
};
