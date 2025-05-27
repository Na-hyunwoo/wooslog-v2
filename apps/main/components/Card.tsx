'use client';

import Image, { ImageProps } from 'next/image';
import { useState } from 'react';

type CardProps = {
  title: string;
  desc: string;
  createdTime: string;
  lastEditedTime: string;
} & ImageProps;

export const Card = ({
  title,
  desc,
  alt,
  src,
  createdTime,
  lastEditedTime,
  ...props
}: CardProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const isModify = createdTime !== lastEditedTime;
  const date = new Date(isModify ? lastEditedTime : createdTime);
  const formattedDate = date.toLocaleDateString('ko-KR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  const renderDate = isModify ? `${formattedDate} (수정됨)` : formattedDate;
  return (
    <div className="block transform transition-transform duration-300 hover:-translate-y-2 shadow-[0_15px_30px_0_rgba(0,0,0,0.05)] overflow-hidden rounded-2xl">
      <div className="relative h-[135px] w-[240px] lg:h-[210px] lg:w-[330px]">
        <Image
          fill
          className={`object-cover transition-opacity duration-500 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoadingComplete={() => setIsLoaded(true)}
          sizes="(max-width: 1024px) 240px, 320px"
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
