'use client';

import Link from 'next/link';

import { createPortal } from 'react-dom';

import { DYNAMIC_ROUTES_PATH } from '@/constants';
import { useSearch } from '@/hooks';
import type { PostMetadata } from '@/types';
import { Search, Trash2, X } from 'lucide-react';

import { Button, Input } from '../ui';

import { HighlightedText } from './HighlightedText';

type Props = {
  onDismiss: () => void;
  posts: PostMetadata[];
};

export function SearchOverlay({ onDismiss, posts }: Props) {
  const { query, results, setQuery } = useSearch(posts, onDismiss);
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
              <Trash2 aria-hidden='true' className='size-5' />
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
            <X aria-hidden='true' className='size-6' />
          </Button>
        </div>

        <p aria-live='polite' className='sr-only'>
          {query.trim()
            ? `${results.length}개 검색 결과`
            : '검색어 입력 대기 중'}
        </p>

        {hasResults ? (
          <section aria-label='검색 결과' className='search-overlay-results'>
            {results.map((post) => (
              <article className='search-overlay-result' key={post.slug}>
                <Link
                  href={DYNAMIC_ROUTES_PATH.ARTICLE(post.slug)}
                  onClick={onDismiss}
                  transitionTypes={['article-forward']}
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

      <div aria-hidden='true' className='search-overlay-cloud'>
        <svg
          fill='none'
          preserveAspectRatio='none'
          viewBox='0 0 4113 146'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M1825 113C1837.5 112 1874.5 145 2058.5 145.5C2242.5 146 2273 119.5 2288.5 119C2304 118.5 2312 140 2519.5 129.5C2727 119 2739.5 81.5 2748.5 82.5C2757.5 83.5 2821.5 105 2980.5 105C3139.5 105 3198 65 3211.5 61C3225 57 3230 91 3447.5 83.5C3665 76 3663 27.5 3675 29.5C3687 31.5 3710 76 3904 76C4098 76 4088 22 4098 19C4102.46 17.6626 4104.43 23.0822 4112.91 29.5V0.5H0.416992V28C24.7581 17.693 38.7983 8.78176 45.5013 9.5C59.5002 11 60.0014 72 226.501 72.5C393.001 73 432.003 19.5 440.502 18C449 16.5 474.502 77.5 669.002 85C863.502 92.5 889.003 56 902.502 56C916 56 937.002 92 1132.5 102.5C1328 113 1353 85 1363.5 85C1374 85 1391 124.5 1596 131.5C1801 138.5 1812.5 114 1825 113Z'
            fill='var(--background)'
          />
        </svg>
      </div>
    </section>,
    document.body,
  );
}
