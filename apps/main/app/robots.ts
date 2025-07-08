import { MetadataRoute } from 'next';

import { BASE_URL } from '@/const';

export default function robots(): MetadataRoute.Robots {
  return {
    host: BASE_URL,
    rules: {
      allow: '/',
      userAgent: '*',
      disallow: ['/favicon.ico', '/_next/'],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
