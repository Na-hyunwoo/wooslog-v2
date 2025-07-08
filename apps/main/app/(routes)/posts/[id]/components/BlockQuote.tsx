import { twMerge } from 'tailwind-merge';

export const Blockquote = ({
  children,
  className,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) => {
  return (
    <blockquote id={id} className={twMerge('mb-6 rounded-2xl bg-slate-700/50 p-4', className)}>
      {children}
    </blockquote>
  );
};
