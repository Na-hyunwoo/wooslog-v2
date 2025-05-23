import { Footer } from '@wooslog/ui';
import { ReactNode } from 'react';

import { Header } from '../components';

import type { Metadata } from 'next';

import '@wooslog/ui/styles.css';
import './globals.css';

export const metadata: Metadata = {
  description: '나현우의 기술적인 고민을 담은 블로그',
  title: '나현우 블로그',
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
          <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
          <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="anonymous" />
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
