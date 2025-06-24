import { twMerge } from 'tailwind-merge';

export const Li = ({
  children,
  className,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) => {
  return (
    <li id={id} className={twMerge(className)}>
      {children}
    </li>
  );
};
