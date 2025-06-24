import { Metadata } from 'next';

import { getPage } from '@/apis';
import { BASE_URL } from '@/const';

export const generatePostMetadata = async ({
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
