import Link from 'next/link';

import { Card, HomePageSchema, SelfIntroduction } from './components';

import { PageViewTracker } from '@/components';
import { METADATA, ON_THE_FIRST_SCREEN } from '@/const';
import { getDatabasesResult, transformPagesToPostsData } from '@/services';

export const metadata = METADATA.HOME;

export default async function Home() {
  const results = await getDatabasesResult();
  const posts = transformPagesToPostsData(results);

  return (
    <main className="mx-auto max-w-screen-lg flex flex-col items-center">
      <HomePageSchema />
      <PageViewTracker pageType="home" />
      <h1 className="text-center text-2xl font-bold mt-10 hidden lg:block">
        호기심이 이끄는 대로 기술을 탐험하고, 생각의 깊이를 더해가는 공간. <br />
        실무에서 놓친 고민들을 되살려 더 나은 개발자로 성장하는 기록.
      </h1>
      <SelfIntroduction />
      <ul className="grid grid-cols-1 lg:grid-cols-2 gap-y-12 justify-center justify-items-center py-10 w-full">
        {posts.map((post, index) => {
          return (
            <li key={post.id}>
              <Link href={`/post/${post.id}`}>
                <Card
                  alt={post.description}
                  src={post.imageUrl}
                  title={post.title}
                  desc={post.description}
                  createdTime={post.createdTime}
                  priority={index < ON_THE_FIRST_SCREEN ? true : false}
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
