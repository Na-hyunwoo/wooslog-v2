'use client';

import Image, { ImageProps } from 'next/image';
import { useState } from 'react';

import { formatPostDate } from '@/lib/utils';

type CardProps = {
  title: string;
  desc: string;
  createdTime: string;
} & ImageProps;

export const Card = ({ title, desc, alt, src, createdTime, ...props }: CardProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const renderDate = formatPostDate(createdTime);

  return (
    <div className="block transform bg-slate-800/50 transition-transform duration-300 lg:hover:-translate-y-2 overflow-hidden rounded-2xl w-[360px] md:w-[480px]">
      <div className="relative w-full aspect-[360/202] md:aspect-[480/269]">
        <Image
          fill
          className={`object-cover transition-opacity duration-500 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setIsLoaded(true)}
          sizes="330px"
          alt={alt}
          src={src}
          {...props}
        />
      </div>
      <div className="h-[160px] pt-6 px-6 pb-5 flex flex-col">
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="mt-1 mb-3 lg:mt-2 lg:mb-5 text-xs">{desc}</p>
        <p className="mt-auto text-xs text-[#c8c8c8] font-medium">{renderDate}</p>
      </div>
    </div>
  );
};
