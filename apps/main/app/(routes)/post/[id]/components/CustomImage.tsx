import Image from 'next/image';
import { twMerge } from 'tailwind-merge';

export const CustomImage = ({
  src,
  alt,
  caption,
  className,
  id,
}: {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
  id?: string;
}) => {
  return (
    <div id={id} className="mb-6">
      <div className="w-2xl relative aspect-[25/14] overflow-hidden rounded-2xl">
        <Image
          src={src}
          alt={alt}
          fill
          className={twMerge('object-cover', className)}
          sizes="672px"
        />
      </div>
      {caption && <p className="text-center text-sm text-gray-500">{caption}</p>}
    </div>
  );
};
