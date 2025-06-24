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
import { getPostDetailData } from './lib/getPostDetailData';
import { generatePostMetadata } from './lib/metadata';
import { generatePostStaticParams } from './lib/static-params';

import { PageViewTracker } from '@/components';
import { BASE_URL } from '@/const';

export const generateMetadata = generatePostMetadata;

export const dynamicParams = true;

export const generateStaticParams = generatePostStaticParams;

export default async function Detail({ params }: { params: Promise<{ id: string }> }) {
  const { id: pageId } = await params;

  const {
    renderDate,
    blocksGroup,
    prevPost,
    nextPost,
    description,
    created_time,
    imageUrl,
    title,
  } = await getPostDetailData(pageId);

  return (
    <main className="mx-auto max-w-2xl py-16 px-4 break-all">
      <BlogPostingSchema
        authorName="나현우"
        datePublished={created_time}
        description={description}
        imageUrl={imageUrl}
        title={title}
        url={`${BASE_URL}/post/${pageId}`}
      />
      <PageViewTracker pageType="post" pageId={pageId} />
      <CustomImage src={imageUrl} alt={title} />
      <H1 className="mb-4">{title}</H1>
      <P className="mb-8">{renderDate}</P>
      <TableOfContents blocks={blocksGroup} />
      {blocksGroup.map((block) => (
        <Fragment key={block.id}>{BlockConverter(block)}</Fragment>
      ))}

      <PostNavigation prevPost={prevPost} nextPost={nextPost} />
    </main>
  );
}
