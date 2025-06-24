import { twMerge } from 'tailwind-merge';

export const H2 = ({
  children,
  className,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) => {
  return (
    <h2 id={id} className={twMerge('my-6 text-3xl font-bold scroll-mt-20', className)}>
      {children}
    </h2>
  );
};
