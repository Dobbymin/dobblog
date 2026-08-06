import Link from 'next/link';

import { Cloud, HeroArtwork } from '@/components';
import { Footer, Header } from '@/layout';
import { posts } from '@/lib/posts';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <>
      <Header variant='home' />
      <main className='clone-home'>
        <section className='clone-home-sky'>
          <Cloud height='456px' viewBoxHeight={456} />
          <HeroArtwork />
          <div aria-hidden='true' className='home-foreground-cloud' />
        </section>
        <div className='site-shell clone-home-grid'>
          <section className='home-newest'>
            <h1>Articles and Tutorials</h1>
            {posts.slice(0, 4).map((post, index) => (
              <article className='home-article' key={post.slug}>
                <Link href={`/articles/${post.slug}`}>
                  <h2>{post.title}</h2>
                </Link>
                <p>{post.description}</p>
                <Link className='read-more' href={`/articles/${post.slug}`}>
                  Read more <ArrowRight size={18} />
                </Link>
                {index < 3 && <hr />}
              </article>
            ))}
          </section>
          <aside className='home-aside'>
            <section className='home-categories'>
              <h2>Browse By Category</h2>
              <div>
                {[
                  ['AI', 'AI'],
                  ['Terminal', 'Terminal'],
                  ['Workflow', 'Workflow'],
                  ['CLI', 'CLI'],
                  ['Investment', '투자'],
                  ['Automation', '자동매매'],
                ].map(([label, tag]) => (
                  <Link
                    href={`/articles?tag=${encodeURIComponent(tag)}`}
                    key={tag}
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </section>
            <section className='home-popular'>
              <h2>Popular Content</h2>
              <ol>
                {posts
                  .slice(4)
                  .concat(posts.slice(0, 3))
                  .map((post) => (
                    <li key={post.slug}>
                      <Link href={`/articles/${post.slug}`}>{post.title}</Link>
                    </li>
                  ))}
              </ol>
            </section>
          </aside>
        </div>
      </main>
      <Footer />
    </>
  );
}
