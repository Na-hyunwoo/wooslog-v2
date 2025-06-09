import Script from 'next/script';

import { BASE_URL } from '@/const';

interface BlogPostingSchemaProps {
  authorName: string;
  category?: string;
  dateModified: string;
  datePublished: string;
  description: string;
  imageUrl: string;
  title: string;
  url: string;
}

export const BlogPostingSchema = ({
  authorName,
  dateModified,
  datePublished,
  description,
  imageUrl,
  title,
  url,
}: BlogPostingSchemaProps) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    articleSection: '기술 블로그',
    author: {
      '@type': 'Person',
      name: authorName,
    },
    citation: `${authorName}. (${new Date(datePublished).getFullYear()}). ${title}. 나현우 블로그. ${url}`,
    copyrightYear: new Date(datePublished).getFullYear(),
    dateModified,
    datePublished,
    description,
    headline: title,
    image: imageUrl,
    inLanguage: 'ko-KR',
    isAccessibleForFree: true,
    keywords: '프론트엔드, 웹개발, Next.js, React',
    mainEntityOfPage: {
      '@id': url,
      '@type': 'WebPage',
    },
    publisher: {
      '@type': 'Organization',
      logo: {
        '@type': 'ImageObject',
        height: 80,
        url: `${BASE_URL}/avatar.png`,
        width: 80,
      },
      name: '나현우 블로그',
    },
    url,
  };

  return (
    <Script
      id="blog-posting-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};
