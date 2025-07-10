import { Footer } from '@wooslog/ui';
import { ReactNode } from 'react';

import { Header } from './posts/components';

import { BASE_URL, METADATA } from '@/const';
import { validateEnv } from '@/lib/utils';

import '@wooslog/ui/styles.css';
import '@/app/globals.css';

// 서버 시작 시 환경 변수 검증
validateEnv();

export const metadata = METADATA.BASE;

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="ko" className="scroll-smooth">
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
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
