import Link from 'next/link';

import { Cloud, PostCard } from '@/components';
import { Footer, Header } from '@/layout';
import { posts } from '@/lib/posts';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <section className='home-hero'>
          <Cloud height='min(31rem, 56vw)' />
          <div className='site-shell hero-content'>
            <p className='eyebrow'>Developer notes &amp; projects</p>
            <h1>
              개발 경험을
              <br />
              <em>기록합니다.</em>
            </h1>
            <p className='hero-description'>
              문제를 해결한 과정과, 만들며 배운 것들을 남깁니다.
            </p>
          </div>
        </section>

        <section className='site-shell content-section latest-section'>
          <div className='section-heading'>
            <div>
              <p className='eyebrow'>Recently published</p>
              <h2>Latest articles</h2>
            </div>
            <Link className='text-link' href='/articles'>
              모든 글 보기 <ArrowRight size={17} />
            </Link>
          </div>
          <div className='post-grid'>
            {posts.slice(0, 3).map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </section>

        <section className='topic-band'>
          <div className='site-shell content-section'>
            <p className='eyebrow'>Browse by topic</p>
            <h2>관심사 따라 읽기</h2>
            <div className='topic-list'>
              {['AI & Agent', 'Terminal', 'Workflow', 'CLI', 'Investing'].map(
                (topic, index) => (
                  <Link href='/articles' key={topic}>
                    <span>0{index + 1}</span>
                    {topic}
                    <ArrowRight size={18} />
                  </Link>
                ),
              )}
            </div>
          </div>
        </section>

        <section className='site-shell content-section popular-section'>
          <div className='section-heading'>
            <div>
              <p className='eyebrow'>From wiki</p>
              <h2>Popular notes</h2>
            </div>
          </div>
          <div className='compact-post-list'>
            {posts.slice(3).map((post) => (
              <PostCard key={post.slug} post={post} variant='compact' />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
