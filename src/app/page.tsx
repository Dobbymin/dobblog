import Link from 'next/link';

import { Cloud, HomeArticleList, PageTransition } from '@/components';
import { DYNAMIC_ROUTES_PATH } from '@/constants';
import { Footer, Header } from '@/layout';
import { postCategories, postSummaries, posts } from '@/lib/posts';

export default function Home() {
  return (
    <PageTransition>
      <div className='route-transition-page'>
        <Header variant='home' />
        <main className='clone-home'>
          <section className='clone-home-sky'>
            <Cloud height='536px' variant='home' viewBoxHeight={536} />
          </section>
          <div className='site-shell clone-home-grid'>
            <section className='home-newest'>
              <h1>Articles</h1>
              <HomeArticleList posts={postSummaries} />
            </section>
            <aside className='home-aside'>
              <section className='home-categories'>
                <h2>Category</h2>
                <div>
                  {postCategories.map((category) => (
                    <Link
                      href={DYNAMIC_ROUTES_PATH.ARTICLES({ tag: category })}
                      key={category}
                    >
                      {category}
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
                        <Link
                          href={DYNAMIC_ROUTES_PATH.ARTICLE(post.slug)}
                          transitionTypes={['article-forward']}
                        >
                          {post.title}
                        </Link>
                      </li>
                    ))}
                </ol>
              </section>
            </aside>
          </div>
        </main>
        <Footer />
      </div>
    </PageTransition>
  );
}
