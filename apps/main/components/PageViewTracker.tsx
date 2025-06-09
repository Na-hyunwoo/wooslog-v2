'use client';

import { useEffect } from 'react';

import { trackPageView } from '@/lib/analytics';

interface PageViewTrackerProps {
  pageType: 'home' | 'post' | 'about';
  pageId?: string;
}

/**
 * 페이지 조회를 추적하는 클라이언트 컴포넌트
 *
 * 이 컴포넌트는 화면에 표시되지 않으며, 페이지가 로드될 때
 * 조회 데이터를 Supabase에 기록합니다.
 */
export const PageViewTracker = ({ pageType, pageId }: PageViewTrackerProps) => {
  useEffect(() => {
    // 페이지가 마운트될 때 한 번만 실행
    trackPageView(pageType, pageId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 아무것도 렌더링하지 않음
  return null;
};
