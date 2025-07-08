import Script from 'next/script';

import { BASE_URL } from '@/const';

export const HomePageSchema = () => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    description: '나현우의 기술적인 고민을 담은 블로그',
    name: '나현우 블로그',
    url: `${BASE_URL}/`,
  };

  return (
    <Script
      id="homepage-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};
