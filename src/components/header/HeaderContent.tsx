'use client';

import Link from 'next/link';

import { EXTERNAL_ROUTES_PATH, ROUTES_PATH } from '@/constants';
import { useHeader } from '@/hooks';
import type { HeaderVariant, PostMetadata } from '@/types';
import { Rss, Search } from 'lucide-react';

import { ThemeToggle } from '../common';
import { SearchOverlay } from '../search';
import { Button } from '../ui';

import { MobileNav } from './MobileNav';

type Props = {
  searchPosts: PostMetadata[];
  variant: HeaderVariant;
};

export function HeaderContent({ searchPosts, variant }: Props) {
  const { closeSearch, headerRef, isScrolled, isSearchOpen, openSearch } =
    useHeader(variant);

  return (
    <>
      <header
        className={`site-header ${variant === 'home' ? 'home-site-header' : ''} ${variant === 'article' ? 'article-site-header' : ''} ${variant === 'about' ? 'about-site-header' : ''} ${isScrolled ? 'is-scrolled' : ''}`}
        ref={headerRef}
      >
        <div className='site-shell site-header-inner'>
          <Link
            aria-label='dobby_min 개발 블로그 홈'
            className='wordmark'
            href={ROUTES_PATH.HOME}
            transitionTypes={
              variant === 'article' || variant === 'about'
                ? ['article-back']
                : undefined
            }
          >
            <p>DOBBY</p>
            <span aria-hidden='true' className='brand-mark' />
            <p>MIN</p>
          </Link>
          <nav aria-label='주요 내비게이션' className='desktop-nav'>
            <a
              href={EXTERNAL_ROUTES_PATH.LINKEDIN}
              rel='noreferrer'
              target='_blank'
            >
              LinkedIn
            </a>
            <a
              href={EXTERNAL_ROUTES_PATH.GITHUB}
              rel='noreferrer'
              target='_blank'
            >
              GitHub
            </a>
            <Link
              href={ROUTES_PATH.ABOUT}
              transitionTypes={['article-forward']}
            >
              About
            </Link>
          </nav>
          <div className='header-actions'>
            <Button
              aria-label='글 검색'
              className='icon-button'
              onClick={openSearch}
              size='icon'
              variant='ghost'
            >
              <Search className='size-5' size={20} strokeWidth={2} />
            </Button>
            {variant !== 'about' ? <ThemeToggle /> : null}
            <a
              aria-label='RSS feed'
              className='icon-button rss-button'
              href={ROUTES_PATH.RSS}
            >
              <Rss className='size-5' size={20} strokeWidth={2} />
            </a>
            <MobileNav />
          </div>
        </div>
      </header>
      {isSearchOpen && (
        <SearchOverlay onDismiss={closeSearch} posts={searchPosts} />
      )}
    </>
  );
}
