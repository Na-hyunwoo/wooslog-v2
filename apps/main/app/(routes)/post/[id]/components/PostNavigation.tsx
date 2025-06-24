import { ChevronLeftIcon, ChevronRightIcon, Button } from '@wooslog/ui';
import Link from 'next/link';

type PostNavigationProps = {
  prevPostId?: string;
  nextPostId?: string;
  prevPostTitle?: string;
  nextPostTitle?: string;
};

export const PostNavigation = ({
  prevPostId,
  nextPostId,
  prevPostTitle,
  nextPostTitle,
}: PostNavigationProps) => {
  if (!prevPostId && !nextPostId) {
    return null;
  }

  return (
    <div className={`flex mt-16 gap-1 ${prevPostId ? 'justify-between' : 'justify-end'}`}>
      {prevPostId && (
        <Button asChild variant="secondary" className="lg:h-16 h-10 w-1/2 p-4">
          <Link href={`/post/${prevPostId}`} className="flex flex-col">
            <p className="flex self-start items-center gap-1 text-xs">
              <ChevronLeftIcon className="size-4" /> 이전 포스트
            </p>
            <p className="text-md text-[#171717] font-bold lg:block hidden">{prevPostTitle}</p>
          </Link>
        </Button>
      )}
      {nextPostId && (
        <Button asChild variant="secondary" className="lg:h-16 h-10 w-1/2 p-4">
          <Link href={`/post/${nextPostId}`} className="flex flex-col">
            <p className="flex self-end items-center gap-1 text-xs">
              다음 포스트 <ChevronRightIcon className="size-4" />
            </p>
            <p className="text-md text-[#171717] font-bold lg:block hidden">{nextPostTitle}</p>
          </Link>
        </Button>
      )}
    </div>
  );
};
