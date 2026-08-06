'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import { useState } from 'react';

import { Input } from '@/components/ui';
import { DYNAMIC_ROUTES_PATH, ROUTES_PATH } from '@/constants';
import type { PostMetadata } from '@/lib/posts';
import { Search, X } from 'lucide-react';

import { PostCard } from './PostCard';

type ArticleExplorerProps = {
  posts: PostMetadata[];
};

export function ArticleExplorer({ posts }: ArticleExplorerProps) {
  const searchParams = useSearchParams();
  const [typedQuery, setTypedQuery] = useState<string | null>(null);
  const query = typedQuery ?? searchParams.get('q') ?? '';
  const activeTag = searchParams.get('tag') ?? '';
  const tags = [...new Set(posts.flatMap((post) => post.tags))].sort((a, b) =>
    a.localeCompare(b, 'ko'),
  );
  const normalizedQuery = query.trim().toLocaleLowerCase('ko');
  const visiblePosts = posts.filter((post) => {
    const matchesQuery =
      !normalizedQuery ||
      [post.title, post.description, ...post.tags]
        .join(' ')
        .toLocaleLowerCase('ko')
        .includes(normalizedQuery);
    const matchesTag = !activeTag || post.tags.includes(activeTag);
    return matchesQuery && matchesTag;
  });

  return (
    <div className='article-explorer'>
      <form
        action={ROUTES_PATH.ARTICLES}
        className='article-search'
        method='get'
        role='search'
      >
        <Search aria-hidden='true' size={18} strokeWidth={2.25} />
        <Input
          aria-label='글 검색'
          name='q'
          onChange={(event) => setTypedQuery(event.target.value)}
          placeholder='글 제목, 주제, 태그 검색'
          type='search'
          value={query}
        />
        {query && (
          <Link
            aria-label='검색어 지우기'
            className='search-clear'
            href={
              activeTag
                ? DYNAMIC_ROUTES_PATH.ARTICLES({ tag: activeTag })
                : ROUTES_PATH.ARTICLES
            }
          >
            <X size={16} />
          </Link>
        )}
      </form>
      <div aria-label='태그 필터' className='filter-list'>
        <Link
          className={!activeTag ? 'is-active' : undefined}
          href={
            query
              ? DYNAMIC_ROUTES_PATH.ARTICLES({ q: query })
              : ROUTES_PATH.ARTICLES
          }
        >
          All
        </Link>
        {tags.map((tag) => {
          return (
            <Link
              className={activeTag === tag ? 'is-active' : undefined}
              href={DYNAMIC_ROUTES_PATH.ARTICLES({ q: query, tag })}
              key={tag}
            >
              {tag}
            </Link>
          );
        })}
      </div>
      <p aria-live='polite' className='search-result-count'>
        {visiblePosts.length}개 글
      </p>
      {visiblePosts.length ? (
        <div className='article-list'>
          {visiblePosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <div className='empty-search'>
          <p>조건에 맞는 글이 없습니다.</p>
          <Link href={ROUTES_PATH.ARTICLES}>전체 글 보기</Link>
        </div>
      )}
    </div>
  );
}
