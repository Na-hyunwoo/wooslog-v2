import type { Metadata } from 'next';
import { Fragment } from 'react';

import {
  addExternalUrlToAllImageBlocks,
  addExternalUrlToAllPageProperties,
  getAllBlocks,
  getDatabasesResult,
  getPage,
} from '@/apis';
import {
  BlockConverter,
  CustomImage,
  H1,
  P,
  BlogPostingSchema,
  PageViewTracker,
} from '@/components';
import { BASE_URL } from '@/const';
import { makeBlocksGroup } from '@/utils/makeBlocksGroup';

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> => {
  const { id: pageId } = await params;

  try {
    const pageData = await getPage(pageId);
    const title = pageData.properties.title.title[0].plain_text;
    const imageUrl = pageData.properties.thumbnail.files[0]?.external?.url;
    const description = pageData.properties.description.rich_text[0].plain_text;

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
    const results = await getDatabasesResult();

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
  await addExternalUrlToAllPageProperties(pageId);
  await addExternalUrlToAllImageBlocks(pageId);

  const blocks = await getAllBlocks(pageId);
  const { created_time, last_edited_time, properties } = await getPage(pageId);
  const description = properties.description.rich_text[0].plain_text;

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
        imageUrl={properties.thumbnail.files[0]?.external?.url || ''}
        title={properties.title.title[0].plain_text}
        url={`${BASE_URL}/post/${pageId}`}
      />
      <PageViewTracker pageType="post" pageId={pageId} />
      <CustomImage
        src={properties.thumbnail.files[0]?.external?.url || ''}
        alt={properties.title.title[0].plain_text}
      />
      <H1 className="mb-4">{properties.title.title[0].plain_text}</H1>
      <P className="mb-8">{renderDate}</P>
      {makeBlocksGroup(blocks).map((block) => (
        <Fragment key={block.id}>{BlockConverter(block)}</Fragment>
      ))}
    </main>
  );
}
