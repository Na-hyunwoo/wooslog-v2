export type PostNavigationProps = {
  prevPost: {
    id: string;
    title: string;
  } | null;
  nextPost: {
    id: string;
    title: string;
  } | null;
};

export type NavigationButtonProps = {
  post: { id: string; title: string };
  direction: 'prev' | 'next';
};
