/* eslint-disable sort-keys */
export const ROUTES = {
  POSTS: '/posts',
  ABOUT: '/about',
} as const;

export const URL = {
  BLOCKS_CHILDREN: (id: string, cursor: string | null = null) => {
    const url = `https://api.notion.com/v1/blocks/${id}/children`;

    return cursor ? `${url}?start_cursor=${cursor}` : url;
  },
  BLOCKS: (id: string) => `https://api.notion.com/v1/blocks/${id}`,
  DATABASES: (id: string) => `https://api.notion.com/v1/databases/${id}/query`,
  PAGE: (id: string) => `https://api.notion.com/v1/pages/${id}`,
} as const;

export const DATABASE_ID = {
  ARCHIVE: '1caec025bcc180798009d8150ebfa3ec',
  POST: '20dec025bcc1808d808dde52e9387fdf',
} as const;

export const ON_THE_FIRST_SCREEN = 6;

export const BASE_URL = 'https://devna.xyz';

export const DEPLOYMENT_STATUS = {
  PENDING: 'PENDING',
  INPROGRESS: 'INPROGRESS',
  SUCCESS: 'SUCCESS',
  FAILED: 'FAILED',
} as const;

export const METADATA = {
  BASE: {
    authors: [{ name: '나현우', url: `${BASE_URL}/` }],
    creator: '나현우',
    description:
      '프론트엔드 개발자 나현우의 기술 블로그. React, Next.js, 웹 개발에 관한 실무 경험과 고민을 공유합니다.',
    keywords: [
      '프론트엔드 개발자',
      '웹 개발',
      'React',
      'Next.js',
      '기술 블로그',
      '자바스크립트',
      '타입스크립트',
      '웹 최적화',
      '개발자 포트폴리오',
    ],
    openGraph: {
      images: [
        {
          alt: '나현우 블로그',
          height: 80,
          url: `${BASE_URL}/avatar.png`,
          width: 80,
        },
      ],
      locale: 'ko_KR',
      siteName: '나현우 기술 블로그',
      title: '나현우 | 프론트엔드 개발자 블로그',
      description:
        '프론트엔드 개발자 나현우의 기술 블로그. React, Next.js, 웹 개발에 관한 실무 경험과 고민을 공유합니다.',
      type: 'website',
      url: `${BASE_URL}/`,
    },
    other: {
      'linkedin:card': 'summary_large_image',
      'linkedin:creator': '나현우',
      'linkedin:description': '나현우의 기술적인 고민을 담은 블로그',
      'linkedin:image': `${BASE_URL}/avatar.png`,
      'linkedin:title': '나현우 블로그',
    },
    publisher: '나현우',
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
    title: {
      default: '나현우 | 프론트엔드 개발자 기술 블로그',
      template: '%s | 나현우 블로그',
    },
    twitter: {
      card: 'summary_large_image',
      creator: '@devna',
      images: [`${BASE_URL}/avatar.png`],
      title: '나현우 | 프론트엔드 개발자 블로그',
      description:
        '프론트엔드 개발자 나현우의 기술 블로그. React, Next.js, 웹 개발에 관한 실무 경험과 고민을 공유합니다.',
    },
  },
  HOME: {
    description:
      '호기심이 이끄는 대로 기술을 탐험하고, 생각의 깊이를 더해가는 공간. 실무에서 놓친 고민들을 되살려 더 나은 개발자로 성장하는 기록.',
    openGraph: {
      description:
        '호기심이 이끄는 대로 기술을 탐험하고, 생각의 깊이를 더해가는 공간. 실무에서 놓친 고민들을 되살려 더 나은 개발자로 성장하는 기록.',
      images: [`${BASE_URL}/avatar.png`],
      title: '나현우 블로그',
      type: 'website',
    },
    title: '홈',
    alternates: {
      canonical: `${BASE_URL}/`,
    },
  },
  ABOUT: {
    description:
      '프론트엔드 개발자 나현우입니다. 확장성을 고려한 코드 작성을 중요하게 생각하며, 지속 가능한 방식으로 성장하는 방법에 대해 고민합니다.',
    openGraph: {
      description:
        '프론트엔드 개발자 나현우입니다. 확장성을 고려한 코드 작성을 중요하게 생각하며, 지속 가능한 방식으로 성장하는 방법에 대해 고민합니다.',
      images: [`${BASE_URL}/avatar.png`],
      title: '나현우 소개',
      type: 'profile',
    },
    title: '소개',
    alternates: {
      canonical: `${BASE_URL}/about/`,
    },
  },
};
