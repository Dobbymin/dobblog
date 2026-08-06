import type { MetadataRoute } from 'next';

import { DYNAMIC_ROUTES_PATH, ROUTES_PATH, SITE_URL } from '@/constants';
import { posts } from '@/lib/posts';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE_URL}${ROUTES_PATH.HOME}`,
      lastModified: new Date('2026-08-06'),
    },
    ...posts.map((post) => ({
      url: `${SITE_URL}${DYNAMIC_ROUTES_PATH.ARTICLE(post.slug)}`,
      lastModified: new Date(post.date),
    })),
  ];
}
