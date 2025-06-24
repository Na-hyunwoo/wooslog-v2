import { ChevronLeftIcon, ChevronRightIcon, Button } from '@wooslog/ui';
import Link from 'next/link';

type PostNavigationProps = {
  prevPost: {
    id: string;
    title: string;
  } | null;
  nextPost: {
    id: string;
    title: string;
  } | null;
};

export const PostNavigation = ({ prevPost, nextPost }: PostNavigationProps) => {
  if (!prevPost && !nextPost) {
    return null;
  }

  return (
    <div className={`flex mt-16 gap-1 ${prevPost ? 'justify-between' : 'justify-end'}`}>
      {prevPost && (
        <Button asChild variant="secondary" className="lg:h-16 h-10 w-1/2 p-4">
          <Link href={`/post/${prevPost.id}`} className="flex flex-col">
            <p className="flex self-start items-center gap-1 text-xs">
              <ChevronLeftIcon className="size-4" /> 이전 포스트
            </p>
            <p className="text-md font-bold lg:block hidden">{prevPost.title}</p>
          </Link>
        </Button>
      )}
      {nextPost && (
        <Button asChild variant="secondary" className="lg:h-16 h-10 w-1/2 p-4">
          <Link href={`/post/${nextPost.id}`} className="flex flex-col">
            <p className="flex self-end items-center gap-1 text-xs">
              다음 포스트 <ChevronRightIcon className="size-4" />
            </p>
            <p className="text-md font-bold lg:block hidden">{nextPost.title}</p>
          </Link>
        </Button>
      )}
    </div>
  );
};
