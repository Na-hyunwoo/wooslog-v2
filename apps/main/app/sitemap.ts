import { MetadataRoute } from 'next';

import { getDatabasesResult } from '@/apis';
import { BASE_URL } from '@/const';

// 기본 라우트(홈, About 페이지)를 반환하는 함수
const getBasicRoutes = (currentDate: string): MetadataRoute.Sitemap => {
  return [
    {
      changeFrequency: 'monthly' as const,
      lastModified: currentDate,
      priority: 1.0,
      url: `${BASE_URL}/`,
    },
    {
      changeFrequency: 'yearly' as const,
      lastModified: currentDate,
      priority: 0.8,
      url: `${BASE_URL}/about/`,
    },
  ];
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 현재 날짜 (기본 페이지의 lastModified에 사용)
  const currentDate = new Date().toISOString();

  try {
    // Notion API에서 포스트 데이터 가져오기
    const results = await getDatabasesResult();

    // 블로그 포스트 URL 생성
    const posts = results.map((post) => ({
      changeFrequency: 'monthly' as const,
      lastModified: new Date(post.last_edited_time).toISOString(),
      priority: 0.7,
      url: `${BASE_URL}/post/${post.id}/`,
    }));

    // 기본 페이지 URL
    const routes = getBasicRoutes(currentDate);

    return [...routes, ...posts.slice(1)];
  } catch (error) {
    console.error('사이트맵 생성 중 오류 발생:', error);
    // 오류 발생 시 기본 페이지만 반환
    return getBasicRoutes(currentDate);
  }
}
