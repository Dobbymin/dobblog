import type { Metadata } from 'next';

import { PostCard } from '@/components';
import { Footer, Header } from '@/layout';
import { posts } from '@/lib/posts';

export const metadata: Metadata = {
  title: 'Articles | dobbymin',
  description: 'dobbymin의 개발 경험 기록.',
};

export default function ArticlesPage() {
  return (
    <>
      <Header />
      <main className='site-shell page-content'>
        <div className='page-intro'>
          <p className='eyebrow'>Archive</p>
          <h1>Articles</h1>
          <p>개발, 프로젝트, 운영에서 얻은 기록입니다.</p>
        </div>
        <div className='article-list'>
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
