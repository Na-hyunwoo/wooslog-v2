import { twMerge } from 'tailwind-merge';

export const H1 = ({
  children,
  className,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) => {
  return (
    <h1 id={id} className={twMerge('mb-6 text-5xl font-bold', className)}>
      {children}
    </h1>
  );
};
