import Image, { ImageProps } from 'next/image';
import Link from 'next/link';

type CardProps = {
  href: string;
  title: string;
  desc: string;
} & ImageProps;

export const Card = ({ href, title, desc, alt, src, ...props }: CardProps) => {
  return (
    <Link
      href={href}
      className="block transform transition-transform duration-300 hover:-translate-y-2"
    >
      <div className="relative h-[212px] w-[380px] overflow-hidden rounded-2xl lg:h-[246px] lg:w-[440px]">
        <Image
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 380px, 440px"
          alt={alt}
          src={src}
          {...props}
        />
      </div>
      <h3 className="mt-5 text-xl font-bold">{title}</h3>
      <p className="mt-3 text-xs">{desc}</p>
    </Link>
  );
};
