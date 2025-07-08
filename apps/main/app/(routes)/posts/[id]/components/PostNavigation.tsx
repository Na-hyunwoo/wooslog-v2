import { NavigationButton } from './NavigationButton';

import { PostNavigationProps } from '@/types/post';

export const PostNavigation = ({ prevPost, nextPost }: PostNavigationProps) => {
  if (!prevPost && !nextPost) {
    return null;
  }

  return (
    <div className={`flex mt-16 gap-1 ${prevPost ? 'justify-between' : 'justify-end'}`}>
      {prevPost && <NavigationButton post={prevPost} direction="prev" />}
      {nextPost && <NavigationButton post={nextPost} direction="next" />}
    </div>
  );
};
