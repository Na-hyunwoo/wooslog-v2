import { ReactNode } from 'react';

// post 하위 라우트를 모두 revalidate 하기위한 layout 추가
export default function PostLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
