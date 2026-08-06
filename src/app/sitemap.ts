import type { MetadataRoute } from 'next';

import { posts } from '@/lib/posts';

const baseUrl = 'https://dobbymin.github.io';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: baseUrl, lastModified: new Date('2026-08-06') },
    { url: `${baseUrl}/articles`, lastModified: new Date('2026-08-06') },
    { url: `${baseUrl}/about`, lastModified: new Date('2026-08-06') },
    ...posts.map((post) => ({
      url: `${baseUrl}/articles/${post.slug}`,
      lastModified: new Date(post.date),
    })),
  ];
}
