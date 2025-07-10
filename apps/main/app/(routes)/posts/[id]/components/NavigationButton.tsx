import { Button, ChevronLeftIcon, ChevronRightIcon } from '@wooslog/ui';
import Link from 'next/link';

import { NavigationButtonProps } from '@/types/notion';

export const NavigationButton = ({ post, direction }: NavigationButtonProps) => {
  const isPrev = direction === 'prev';
  const Icon = isPrev ? ChevronLeftIcon : ChevronRightIcon;
  const label = isPrev ? '이전 포스트' : '다음 포스트';

  return (
    <Button asChild variant="secondary" className={`md:h-16 h-10 w-1/2 px-2 md:px-4 gap-0`}>
      <Link href={`/posts/${post.id}`} className="flex flex-col">
        <p
          className={`flex items-center gap-1 text-xs md:pb-2 ${isPrev ? 'self-start' : 'self-end'}`}
        >
          {isPrev && <Icon className="size-4" />}
          {label}
          {!isPrev && <Icon className="size-4" />}
        </p>
        <p
          className={`w-full truncate md:w-auto text-xs md:text-sm font-bold md:block ${isPrev ? 'self-start' : 'self-end'}`}
        >
          {post.title}
        </p>
      </Link>
    </Button>
  );
};
