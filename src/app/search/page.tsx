import type { Metadata } from 'next';

import { Suspense } from 'react';

import { SearchExperience } from '@/components';
import { postSummaries } from '@/lib/posts';

export const metadata: Metadata = {
  title: 'Search',
  description: 'dobbymin 개발 블로그 글 검색.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function SearchPage() {
  return (
    <Suspense fallback={<main className='search-page' />}>
      <SearchExperience posts={postSummaries} />
    </Suspense>
  );
}
