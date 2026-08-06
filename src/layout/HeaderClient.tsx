'use client';

import Link from 'next/link';

import { useEffect, useRef, useState } from 'react';

import { MobileNav, SearchOverlay, ThemeToggle } from '@/components';
import { Button } from '@/components/ui';
import {
  EXTERNAL_ROUTES_PATH,
  ROUTES_PATH,
} from '@/constants';
import type { PostMetadata } from '@/lib/posts';
import { Rss, Search } from 'lucide-react';

type HeaderClientProps = {
  searchPosts: PostMetadata[];
  variant: 'default' | 'home' | 'article';
};

export const HeaderClient = ({ searchPosts, variant }: HeaderClientProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchTriggerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (variant === 'default') return;

    const updateScrollState = () => setIsScrolled(window.scrollY > 24);
    const animationFrame = window.requestAnimationFrame(updateScrollState);
    window.addEventListener('scroll', updateScrollState, { passive: true });
    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener('scroll', updateScrollState);
    };
  }, [variant]);

  const openSearch = () => {
    searchTriggerRef.current = document.activeElement as HTMLElement | null;
    setIsSearchOpen(true);
  };

  const closeSearch = () => {
    setIsSearchOpen(false);
    window.requestAnimationFrame(() => searchTriggerRef.current?.focus());
  };

  return (
    <>
      <header
        className={`site-header ${variant === 'home' ? 'home-site-header' : ''} ${variant === 'article' ? 'article-site-header' : ''} ${isScrolled ? 'is-scrolled' : ''}`}
      >
        <div className='site-shell site-header-inner'>
          <Link
            aria-label='dobbymin 개발 블로그 홈'
            className='wordmark'
            href={ROUTES_PATH.HOME}
          >
            dobbymin<span>’s</span>
          </Link>
          <nav aria-label='주요 내비게이션' className='desktop-nav'>
            <Link href={ROUTES_PATH.ARTICLES}>Articles</Link>
            <Link href={ROUTES_PATH.ABOUT}>About</Link>
            <a
              href={EXTERNAL_ROUTES_PATH.WIKI}
              rel='noreferrer'
              target='_blank'
            >
              Wiki
            </a>
          </nav>
          <div className='header-actions'>
            {variant === 'article' ? (
              <>
                <Button
                  aria-label='글 검색'
                  className='icon-button'
                  onClick={openSearch}
                  size='icon'
                  type='button'
                  variant='ghost'
                >
                  <Search size={20} strokeWidth={2} />
                </Button>
                <ThemeToggle />
                <a
                  aria-label='RSS feed'
                  className='icon-button'
                  href={ROUTES_PATH.RSS}
                >
                  <Rss size={20} strokeWidth={2} />
                </a>
              </>
            ) : (
              <>
                <div className='header-utility'>
                  <Button
                    aria-label='글 검색'
                    className='icon-button'
                    onClick={openSearch}
                    size='icon'
                    type='button'
                    variant='ghost'
                  >
                    <Search size={18} strokeWidth={2.25} />
                  </Button>
                  <a
                    aria-label='RSS feed'
                    className='icon-button'
                    href={ROUTES_PATH.RSS}
                  >
                    <Rss size={18} strokeWidth={2.25} />
                  </a>
                </div>
                <ThemeToggle />
              </>
            )}
            <MobileNav onSearch={openSearch} />
          </div>
        </div>
      </header>
      {isSearchOpen && (
        <SearchOverlay
          onDismiss={closeSearch}
          posts={searchPosts}
        />
      )}
    </>
  );
};
