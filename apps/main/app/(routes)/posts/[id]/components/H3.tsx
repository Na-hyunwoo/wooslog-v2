import { twMerge } from 'tailwind-merge';

export const H3 = ({
  children,
  className,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) => {
  return (
    <h3 id={id} className={twMerge('my-6 text-xl md:text-2xl font-bold', className)}>
      {children}
    </h3>
  );
};
