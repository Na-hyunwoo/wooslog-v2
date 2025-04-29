import { Card } from '../../../components';
import { DATABASE_ID, ON_THE_FIRST_SCREEN, URL } from '../../../const';
import { DatabaseResultType } from '../../../types';

export const revalidate = 3600;

export default async function Archive() {
  const res = await fetch(URL.DATABASES(DATABASE_ID.ARCHIVE), {
    headers: {
      Authorization: `Bearer ${process.env.NOTION_API_KEY}`,
      'Content-Type': 'application/json',
      'Notion-Version': '2022-06-28',
    },
    method: 'POST',
  });
  const { results }: { results: DatabaseResultType[] } = await res.json();

  return (
    <main className="mx-auto grid max-w-screen-lg grid-cols-1 justify-center justify-items-center gap-y-16 py-10 lg:grid-cols-2 lg:gap-y-8">
      {results.map((result, index) => {
        return (
          <Card
            key={result.id}
            href={`/post/${result.id}`}
            alt={result.properties['설명'].rich_text[0].plain_text}
            src={result.properties['이미지'].files[0].file.url}
            title={result.properties['이름'].title[0].plain_text}
            desc={result.properties['설명'].rich_text[0].plain_text}
            priority={index < ON_THE_FIRST_SCREEN ? true : false}
          />
        );
      })}
    </main>
  );
}
