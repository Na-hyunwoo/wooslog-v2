import { Footer } from '@wooslog/ui';
import type { Metadata } from 'next';
import { ReactNode } from 'react';

import { Header } from '@/components';
import { BASE_URL } from '@/const';

import '@wooslog/ui/styles.css';
import './globals.css';

export const metadata: Metadata = {
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  {
    return (
      <html lang="ko">
        <head>
          <link rel="sitemap" type="application/xml" href={`${BASE_URL}/sitemap.xml`} />
          <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="anonymous" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
          <link
            rel="stylesheet"
            as="style"
            crossOrigin="anonymous"
            href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
          />
        </head>
        <body className="antialiased">
          <Header />
          {children}
          <Footer />
        </body>
      </html>
    );
  }
}
