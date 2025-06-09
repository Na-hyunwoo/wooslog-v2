import { Footer } from '@wooslog/ui';
import type { Metadata } from 'next';
import { ReactNode } from 'react';

import { Header } from '@/components';
import { BASE_URL } from '@/const';

import '@wooslog/ui/styles.css';
import './globals.css';

export const metadata: Metadata = {
  authors: [{ name: '나현우' }],
  creator: '나현우',
  description: '나현우의 기술적인 고민을 담은 블로그',
  keywords: ['웹 개발', '프론트엔드', 'React', 'Next.js', '기술 블로그', '개발자'],
  openGraph: {
    description: '나현우의 기술적인 고민을 담은 블로그',
    images: [
      {
        alt: '나현우 블로그',
        height: 80,
        url: '/avatar.png',
        width: 80,
      },
    ],
    locale: 'ko_KR',
    siteName: '나현우 블로그',
    title: '나현우 블로그',
    type: 'website',
    url: BASE_URL,
  },
  other: {
    'linkedin:card': 'summary_large_image',
    'linkedin:creator': '나현우',
    'linkedin:description': '나현우의 기술적인 고민을 담은 블로그',
    'linkedin:image': `${BASE_URL}/avatar.png`,
    'linkedin:title': '나현우 블로그',
  },
  publisher: '나현우',
  robots: 'index, follow',
  title: {
    default: '나현우 블로그',
    template: '%s | 나현우 블로그',
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@devna',
    description: '나현우의 기술적인 고민을 담은 블로그',
    images: [`${BASE_URL}/avatar.png`],
    title: '나현우 블로그',
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
