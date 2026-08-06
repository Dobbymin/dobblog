import type { Post, PostMetadata } from '@/types';
import { formatDate } from '@/utils';

import { Cloud } from '../common';

import { ArticlePagination } from './ArticlePagination';
import { ArticleToc } from './ArticleToc';

type Props = {
  nextPost?: PostMetadata;
  post: Post;
  previousPost?: PostMetadata;
};

export function ArticleContent({ nextPost, post, previousPost }: Props) {
  const { Content } = post;

  return (
    <>
      <section className='article-hero'>
        <div className='article-hero-spacer' />
        <header className='site-shell article-header'>
          <span className='article-category-badge'>{post.tags[0]}</span>
          <h1>{post.title}</h1>
          <div className='article-meta'>
            <span aria-label='작성일' className='article-meta-date'>
              <span aria-hidden='true' className='cloud-mark' />
              <time dateTime={post.date}>{formatDate(post.date)}</time>
            </span>
          </div>
        </header>
        <Cloud height='357px' variant='article' viewBoxHeight={357} />
      </section>
      <main className='article-main'>
        <div className='site-shell article-page'>
          <div className='article-layout'>
            <article className='prose'>
              <Content />
            </article>
            <ArticleToc headings={post.headings} />
          </div>
          <ArticlePagination nextPost={nextPost} previousPost={previousPost} />
        </div>
      </main>
    </>
  );
}
