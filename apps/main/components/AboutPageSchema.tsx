import Script from 'next/script';

import { BASE_URL } from '../const';

export const AboutPageSchema = () => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    alumniOf: [
      {
        '@type': 'Organization',
        name: '뤼튼',
        url: 'https://wrtn.ai/',
      },
    ],
    description:
      '프론트엔드 개발자 나현우입니다. 확장성을 고려한 코드 작성을 중요하게 생각하며, 지속 가능한 방식으로 성장하는 방법에 대해 고민합니다.',
    email: 'contactharry97@gmail.com',
    image: `${BASE_URL}/avatar.png`,
    jobTitle: '프론트엔드 개발자',
    knowsAbout: ['프론트엔드 개발', 'React', 'Next.js', '웹 개발'],
    name: '나현우',
    sameAs: ['https://github.com/Na-hyunwoo', 'https://linkedin.com/in/na-hyunwoo'],
    url: `${BASE_URL}/about`,
    worksFor: {
      '@type': 'Organization',
      name: '텀블벅',
      url: 'https://www.tumblbug.com/',
    },
  };

  return (
    <Script
      id="about-page-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};
