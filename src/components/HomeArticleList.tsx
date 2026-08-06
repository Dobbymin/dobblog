'use client';

import Link from 'next/link';

import { useState } from 'react';

import { Button, Separator } from '@/components/ui';
import { DYNAMIC_ROUTES_PATH } from '@/constants';
import type { PostMetadata } from '@/lib/posts';
import { ArrowDown } from 'lucide-react';

const INITIAL_ARTICLE_COUNT = 12;

type HomeArticleListProps = {
  posts: PostMetadata[];
};

export function HomeArticleList({ posts }: HomeArticleListProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasMoreArticles = posts.length > INITIAL_ARTICLE_COUNT;
  const visiblePosts = isExpanded
    ? posts
    : posts.slice(0, INITIAL_ARTICLE_COUNT);

  return (
    <div className='home-article-list'>
      {visiblePosts.map((post, index) => (
        <article
          className={
            isExpanded && index >= INITIAL_ARTICLE_COUNT
              ? 'home-article home-article-revealed'
              : 'home-article'
          }
          key={post.slug}
        >
          <Link
            className='home-article-card'
            href={DYNAMIC_ROUTES_PATH.ARTICLE(post.slug)}
            transitionTypes={['article-forward']}
          >
            <h2>{post.title}</h2>
            <p>{post.description}</p>
          </Link>
          {index < visiblePosts.length - 1 && (
            <Separator className='home-article-separator' />
          )}
        </article>
      ))}

      {!isExpanded && hasMoreArticles && (
        <div className='home-show-more'>
          <Button
            className='home-show-more-button'
            onClick={() => setIsExpanded(true)}
            type='button'
          >
            <span className='home-show-more-icon' aria-hidden='true'>
              <ArrowDown />
            </span>
            <span>Show more</span>
          </Button>
        </div>
      )}
    </div>
  );
}
