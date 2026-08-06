'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

import { Fragment, useEffect, useMemo, useState } from 'react';

import { Button, Input } from '@/components/ui';
import { DYNAMIC_ROUTES_PATH, ROUTES_PATH } from '@/constants';
import type { PostMetadata } from '@/lib/posts';
import { Search, Trash2, X } from 'lucide-react';

type SearchExperienceProps = {
  posts: PostMetadata[];
};

const normalize = (value: string) => value.toLocaleLowerCase('ko');

const escapeRegExp = (value: string) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const getReturnPath = (pathname: string | null) => {
  if (
    !pathname ||
    !pathname.startsWith('/') ||
    pathname.startsWith('//') ||
    pathname === ROUTES_PATH.SEARCH
  ) {
    return ROUTES_PATH.HOME;
  }

  return pathname;
};

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

export function SearchExperience({
  posts,
}: SearchExperienceProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnPath = getReturnPath(searchParams.get('from'));
  const [query, setQuery] = useState(() => searchParams.get('q') ?? '');
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
      if (event.key === 'Escape') router.push(returnPath);
    };

    window.addEventListener('keydown', dismissOnEscape);
    return () => window.removeEventListener('keydown', dismissOnEscape);
  }, [returnPath, router]);

  return (
    <main className='search-page'>
      <Link aria-label='검색 닫기' className='search-page-close' href={returnPath}>
        <X aria-hidden='true' size={24} strokeWidth={2} />
      </Link>
      <div className='search-page-shell'>
        <form
          className='search-page-form'
          onSubmit={(event) => event.preventDefault()}
          role='search'
        >
          <Search aria-hidden='true' size={20} strokeWidth={2} />
          <Input
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
            className='search-page-reset'
            disabled={!query}
            onClick={() => setQuery('')}
            size='icon'
            type='reset'
            variant='ghost'
          >
            <Trash2 aria-hidden='true' size={20} strokeWidth={2} />
          </Button>
        </form>

        <p aria-live='polite' className='sr-only'>
          {query.trim() ? `${results.length}개 검색 결과` : '검색어 입력 대기 중'}
        </p>

        {query.trim() ? (
          results.length ? (
            <section aria-label='검색 결과' className='search-page-results'>
              {results.map((post) => (
                <article className='search-page-result' key={post.slug}>
                  <Link href={DYNAMIC_ROUTES_PATH.ARTICLE(post.slug)}>
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
          ) : (
            <div className='search-page-empty'>
              <p>일치하는 글이 없습니다.</p>
              <span>다른 검색어를 입력해보세요.</span>
            </div>
          )
        ) : (
          <div className='search-page-idle'>
            <p>개발 기록 검색</p>
            <span>제목, 내용, 태그를 검색할 수 있습니다.</span>
          </div>
        )}
      </div>
    </main>
  );
}
