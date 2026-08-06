import Link from 'next/link';

import { DYNAMIC_ROUTES_PATH } from '@/constants';
import type { PostMetadata } from '@/types';

import { Cloud } from '../common';

import { HomeArticleList } from './HomeArticleList';

type Props = {
  categories: string[];
  posts: PostMetadata[];
};

export function HomeContent({ categories, posts }: Props) {
  return (
    <main className='clone-home'>
      <section className='clone-home-sky'>
        <Cloud height='536px' variant='home' viewBoxHeight={536} />
      </section>
      <div className='site-shell clone-home-grid'>
        <section className='home-newest'>
          <h1>Articles</h1>
          <HomeArticleList posts={posts} />
        </section>
        <aside className='home-aside'>
          <section className='home-categories'>
            <h2>Category</h2>
            <div>
              {categories.map((category) => (
                <span className='home-category-pill' key={category}>
                  {category}
                </span>
              ))}
            </div>
          </section>
          <section className='home-popular'>
            <h2>Recent Content</h2>
            <ol>
              {posts.slice(0, 10).map((post) => (
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
  );
}
