import Image from 'next/image';
import Link from 'next/link';

import { Card } from '../components';
import { HomePageSchema } from '../components/HomePageSchema';
import { PageViewTracker } from '../components/PageViewTracker';
import { BASE_URL, DATABASE_ID, ON_THE_FIRST_SCREEN, URL } from '../const';
import { getNotionHeaders } from '../lib/notion';
import { DatabaseResultType } from '../types';

import { addExternalUrlToAllPageProperties } from './(routes)/post/[id]/apis';

export const revalidate = 3600;

export const metadata = {
  description:
    '호기심이 이끄는 대로 기술을 탐험하고, 생각의 깊이를 더해가는 공간. 실무에서 놓친 고민들을 되살려 더 나은 개발자로 성장하는 기록.',
  openGraph: {
    description:
      '호기심이 이끄는 대로 기술을 탐험하고, 생각의 깊이를 더해가는 공간. 실무에서 놓친 고민들을 되살려 더 나은 개발자로 성장하는 기록.',
    images: [`${BASE_URL}/avatar.png`],
    title: '나현우 블로그',
    type: 'website',
  },
  title: '홈',
};

export default async function Home() {
  await addExternalUrlToAllPageProperties(DATABASE_ID.POST);
  const res = await fetch(URL.DATABASES(DATABASE_ID.POST), {
    headers: getNotionHeaders(),
    method: 'POST',
  });
  const { results = [] }: { results?: DatabaseResultType[] } = await res.json();

  return (
    <main className="mx-auto max-w-screen-lg flex flex-col items-center">
      <HomePageSchema />
      <PageViewTracker pageType="home" />
      <h1 className="text-center text-2xl font-bold mt-10 hidden lg:block">
        호기심이 이끄는 대로 기술을 탐험하고, 생각의 깊이를 더해가는 공간. <br />
        실무에서 놓친 고민들을 되살려 더 나은 개발자로 성장하는 기록.
      </h1>
      <section className="flex items-center justify-center gap-x-4 my-10 shadow-[0_2px_33px_rgba(0,0,0,0.25)] rounded-2xl p-4 w-fit mx-2">
        <Image
          src="/avatar.png"
          alt="avatar"
          width={80}
          height={80}
          className="rounded-full shadow-2xl"
          priority
        />
        <div>
          <p className="font-bold">나현우</p>
          <p className="font-medium text-xs md:text-sm">
            코드 한 줄에도 깊은 고민을 담는 개발자입니다. 단순히 작동하는 코드를 넘어, 유지보수성과
            확장성을 고려한 설계를 추구합니다.
          </p>
          <p className="font-medium text-xs md:text-sm hidden lg:block">
            시간에 쫓겨 삼켜야 했던 고민들을 개인 프로젝트에서 풀어내며, 그 과정에서 얻은 통찰력으로
            더 나은 개발자가 되려 노력합니다.
          </p>
        </div>
      </section>
      <ul className="grid grid-cols-1 lg:grid-cols-2 gap-y-12 justify-center justify-items-center py-10 w-full">
        {results.map((result, index) => {
          const imageUrl =
            result.properties['이미지'].files[0]?.external?.url ||
            result.properties['이미지'].files[0]?.file?.url ||
            '';

          return (
            <li key={result.id}>
              <Link href={`/post/${result.id}`}>
                <Card
                  alt={result.properties['설명'].rich_text[0].plain_text}
                  src={imageUrl}
                  title={result.properties['이름'].title[0].plain_text}
                  desc={result.properties['설명'].rich_text[0].plain_text}
                  createdTime={result.created_time}
                  lastEditedTime={result.last_edited_time}
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
