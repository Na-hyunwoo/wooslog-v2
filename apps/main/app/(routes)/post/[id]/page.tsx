import { Fragment } from 'react';

import { BlockConverter, CustomImage, H1, P } from '../../../../components/BlockConverter';
import { DATABASE_ID, URL } from '../../../../const';
import { BlockInterface, DatabaseResultType, PageInterface } from '../../../../types';
import { makeBlocksGroup } from '../../../../utils/makeBlocksGroup';

export const dynamicParams = true;

export const generateStaticParams = async () => {
  try {
    const res = await fetch(URL.DATABASES(DATABASE_ID.POST), {
      headers: {
        Authorization: `Bearer ${process.env.NOTION_API_KEY}`,
        'Content-Type': 'application/json',
        'Notion-Version': '2022-06-28',
      },
      method: 'POST',
    });
    const { results = [] }: { results?: DatabaseResultType[] } = await res.json();

    return results.map((result) => ({
      id: result.id,
    }));
  } catch (error) {
    console.error('Failed to generate static params:', error);
    return [];
  }
};

export default async function Detail({ params }: { params: Promise<{ id: string }> }) {
  const { id: pageId } = await params;

  const blockRes = await fetch(URL.BLOCKS(pageId), {
    headers: {
      Authorization: `Bearer ${process.env.NOTION_API_KEY}`,
      'Content-Type': 'application/json',
      'Notion-Version': '2022-06-28',
    },
    method: 'GET',
  });
  const { results: blocks }: { results: BlockInterface[] } = await blockRes.json();

  const pageRes = await fetch(URL.PAGE(pageId), {
    headers: {
      Authorization: `Bearer ${process.env.NOTION_API_KEY}`,
      'Content-Type': 'application/json',
      'Notion-Version': '2022-06-28',
    },
    method: 'GET',
  });
  const { created_time, last_edited_time, properties }: PageInterface = await pageRes.json();

  const isModify = created_time !== last_edited_time;
  const date = new Date(isModify ? last_edited_time : created_time);
  const formattedDate = date.toLocaleDateString('ko-KR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  const renderDate = isModify ? `${formattedDate} (수정됨)` : formattedDate;

  return (
    <main className="mx-auto max-w-2xl py-16 px-2 break-all">
      <CustomImage
        src={properties.이미지.files[0].file.url}
        alt={properties.이미지.files[0].file.url}
        className="object-cover"
      />
      <H1 className="mb-4">{properties.이름.title[0].plain_text}</H1>
      <P className="mb-8">{renderDate}</P>
      {makeBlocksGroup(blocks).map((block) => (
        <Fragment key={block.id}>{BlockConverter(block)}</Fragment>
      ))}
    </main>
  );
}
