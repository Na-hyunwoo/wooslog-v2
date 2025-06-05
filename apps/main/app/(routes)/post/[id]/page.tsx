import { Fragment } from 'react';

import { BlockConverter, CustomImage, H1, P } from '../../../../components/BlockConverter';
import { BlogPostingSchema } from '../../../../components/BlogPostingSchema';
import { PageViewTracker } from '../../../../components/PageViewTracker';
import { BASE_URL, DATABASE_ID, URL } from '../../../../const';
import { getNotionHeaders } from '../../../../lib/notion';
import { DatabaseResultType, PageInterface } from '../../../../types';
import { makeBlocksGroup } from '../../../../utils/makeBlocksGroup';

import { addExternalUrlToAllImageBlocks, getAllBlocks, getPage } from './apis';

import type { Metadata } from 'next';

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> => {
  const { id: pageId } = await params;

  try {
    const pageRes = await fetch(URL.PAGE(pageId), {
      headers: getNotionHeaders(),
      method: 'GET',
    });

    const pageData: PageInterface = await pageRes.json();
    const title = pageData.properties.이름.title[0].plain_text;
    const imageUrl = pageData.properties.이미지?.files?.[0]?.file?.url;
    const description = pageData.properties.설명?.rich_text?.[0]?.plain_text || '';

    return {
      description,
      openGraph: {
        description,
        images: imageUrl ? [imageUrl] : [],
        title,
        type: 'article',
      },
      title,
      twitter: {
        card: 'summary_large_image',
        description,
        images: imageUrl ? [imageUrl] : [],
        title,
      },
    };
  } catch (error) {
    console.error('Failed to generate metadata:', error);
    return {
      description: '포스트를 불러오는 중에 오류가 발생했습니다.',
      title: '포스트',
    };
  }
};

export const revalidate = 3600;

export const dynamicParams = true;

export const generateStaticParams = async () => {
  try {
    const res = await fetch(URL.DATABASES(DATABASE_ID.POST), {
      headers: getNotionHeaders(),
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
  await addExternalUrlToAllImageBlocks(pageId);
  const blocks = await getAllBlocks(pageId);

  const { created_time, last_edited_time, properties } = await getPage(pageId);
  const description = properties.설명.rich_text[0].plain_text;

  const isModify = created_time !== last_edited_time;
  const date = new Date(isModify ? last_edited_time : created_time);
  const formattedDate = date.toLocaleDateString('ko-KR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  const renderDate = isModify ? `${formattedDate} (수정됨)` : formattedDate;

  return (
    <main className="mx-auto max-w-2xl py-16 px-4 break-all">
      <BlogPostingSchema
        authorName="나현우"
        dateModified={last_edited_time}
        datePublished={created_time}
        description={description}
        imageUrl={properties.이미지.files[0].file.url}
        title={properties.이름.title[0].plain_text}
        url={`${BASE_URL}/post/${pageId}`}
      />
      <PageViewTracker pageType="post" pageId={pageId} />
      <CustomImage
        src={properties.이미지.files[0].file.url}
        alt={properties.이름.title[0].plain_text}
      />
      <H1 className="mb-4">{properties.이름.title[0].plain_text}</H1>
      <P className="mb-8">{renderDate}</P>
      {makeBlocksGroup(blocks).map((block) => (
        <Fragment key={block.id}>{BlockConverter(block)}</Fragment>
      ))}
    </main>
  );
}
