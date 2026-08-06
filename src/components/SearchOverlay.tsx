'use client';

import Link from 'next/link';

import { Fragment, useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';

import { Button, Input } from '@/components/ui';
import { DYNAMIC_ROUTES_PATH } from '@/constants';
import type { PostMetadata } from '@/lib/posts';
import { Search, Trash2, X } from 'lucide-react';

type SearchOverlayProps = {
  onDismiss: () => void;
  posts: PostMetadata[];
};

const normalize = (value: string) => value.toLocaleLowerCase('ko');

const escapeRegExp = (value: string) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

function HighlightedText({ query, text }: { query: string; text: string }) {
  const tokens = query.trim().split(/\s+/).filter(Boolean);
  if (!tokens.length) return text;

  const pattern = new RegExp(`(${tokens.map(escapeRegExp).join('|')})`, 'giu');
  const normalizedTokens = new Set(tokens.map(normalize));

  return text.split(pattern).map((part, index) => (
    <Fragment key={`${part}-${index}`}>
      {normalizedTokens.has(normalize(part)) ? <mark>{part}</mark> : part}
    </Fragment>
  ));
}

export function SearchOverlay({ onDismiss, posts }: SearchOverlayProps) {
  const [query, setQuery] = useState('');
  const results = useMemo(() => {
    const tokens = query.trim().split(/\s+/).filter(Boolean).map(normalize);
    if (!tokens.length) return [];

    return posts.filter((post) => {
      const searchableText = normalize(
        [
          post.title,
          post.description,
          ...post.tags,
          ...post.headings,
        ].join(' '),
      );

      return tokens.every((token) => searchableText.includes(token));
    });
  }, [posts, query]);

  useEffect(() => {
    const dismissOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onDismiss();
    };

    window.addEventListener('keydown', dismissOnEscape);
    return () => window.removeEventListener('keydown', dismissOnEscape);
  }, [onDismiss]);

  const hasResults = results.length > 0;

  return createPortal(
    <section
      aria-label='블로그 검색'
      aria-modal='true'
      className={`search-overlay ${hasResults ? 'has-results' : ''}`}
      role='dialog'
    >
      <div className='search-overlay-shell'>
        <div className='search-overlay-controls'>
          <form
            className='search-overlay-form'
            onSubmit={(event) => event.preventDefault()}
            role='search'
          >
            <Search aria-hidden='true' size={20} strokeWidth={2} />
            <Input
              aria-label='글 검색'
              autoCapitalize='off'
              autoComplete='off'
              autoCorrect='off'
              autoFocus
              maxLength={150}
              onChange={(event) => setQuery(event.target.value)}
              placeholder='검색어를 입력하세요'
              spellCheck={false}
              type='search'
              value={query}
            />
            <Button
              aria-label='검색어 지우기'
              className='search-overlay-reset'
              disabled={!query}
              onClick={() => setQuery('')}
              size='icon'
              type='reset'
              variant='ghost'
            >
              <Trash2
                aria-hidden='true'
                className='size-5'
                size={20}
                strokeWidth={2}
              />
            </Button>
          </form>
          <Button
            aria-label='검색 닫기'
            className='search-overlay-close'
            onClick={onDismiss}
            size='icon'
            type='button'
            variant='ghost'
          >
            <X
              aria-hidden='true'
              className='size-6'
              size={24}
              strokeWidth={2}
            />
          </Button>
        </div>

        <p aria-live='polite' className='sr-only'>
          {query.trim() ? `${results.length}개 검색 결과` : '검색어 입력 대기 중'}
        </p>

        {hasResults ? (
          <section aria-label='검색 결과' className='search-overlay-results'>
            {results.map((post) => (
              <article className='search-overlay-result' key={post.slug}>
                <Link
                  href={DYNAMIC_ROUTES_PATH.ARTICLE(post.slug)}
                  onClick={onDismiss}
                >
                  <span>{post.tags[0] ?? 'Article'}</span>
                  <h2>
                    <HighlightedText query={query} text={post.title} />
                  </h2>
                  <p>
                    <HighlightedText query={query} text={post.description} />
                  </p>
                </Link>
              </article>
            ))}
          </section>
        ) : !query.trim() ? (
          <p className='search-overlay-hint'>
            블로그의 모든 글을 검색합니다. 제목, 내용, 태그를 기준으로 검색할 수
            있습니다.
          </p>
        ) : null}
      </div>
    </section>,
    document.body,
  );
}
