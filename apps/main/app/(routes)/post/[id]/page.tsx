import type { Metadata } from 'next';
import { Fragment } from 'react';

import {
  BlockConverter,
  BlogPostingSchema,
  CustomImage,
  H1,
  P,
  PostNavigation,
  TableOfContents,
} from './components';

import {
  addExternalUrlToAllImageBlocks,
  addExternalUrlToAllPageProperties,
  getAllBlocks,
  getDatabasesResult,
  getPage,
} from '@/apis';
import { PageViewTracker } from '@/components';
import { BASE_URL } from '@/const';
import { formatPostDate, makeBlocksGroup } from '@/utils';

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
        authors: ['나현우'],
      },
      title,
      twitter: {
        card: 'summary_large_image',
        description,
        images: imageUrl ? [imageUrl] : [],
        title,
      },
      alternates: {
        canonical: `${BASE_URL}/post/${pageId}/`,
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
  const blocksGroup = makeBlocksGroup(blocks);
  const { created_time, properties } = await getPage(pageId);
  const prevPostId = properties.prevPostId.rich_text[0]?.plain_text;
  const nextPostId = properties.nextPostId.rich_text[0]?.plain_text;
  const { properties: prevPostProperties } = prevPostId ? await getPage(prevPostId) : {};
  const { properties: nextPostProperties } = nextPostId ? await getPage(nextPostId) : {};
  const description = properties.description.rich_text[0].plain_text;

  const renderDate = formatPostDate(created_time);

  return (
    <main className="mx-auto max-w-2xl py-16 px-4 break-all">
      <BlogPostingSchema
        authorName="나현우"
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
      <TableOfContents blocks={blocksGroup} />
      {blocksGroup.map((block) => (
        <Fragment key={block.id}>{BlockConverter(block)}</Fragment>
      ))}

      <PostNavigation
        prevPostId={prevPostId}
        nextPostId={nextPostId}
        prevPostTitle={prevPostProperties?.title.title[0]?.plain_text}
        nextPostTitle={nextPostProperties?.title.title[0]?.plain_text}
      />
    </main>
  );
}
