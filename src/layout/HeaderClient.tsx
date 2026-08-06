'use client';

import Link from 'next/link';

import { useEffect, useRef, useState } from 'react';

import { MobileNav, SearchOverlay, ThemeToggle } from '@/components';
import { Button } from '@/components/ui';
import { ROUTES_PATH } from '@/constants';
import type { PostMetadata } from '@/lib/posts';
import { Rss, Search } from 'lucide-react';

type HeaderClientProps = {
  searchPosts: PostMetadata[];
  variant: 'default' | 'home' | 'article';
};

export const HeaderClient = ({ searchPosts, variant }: HeaderClientProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const searchTriggerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (variant !== 'home') return;

    let animationFrame = 0;
    const updateScrollState = () => {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = window.requestAnimationFrame(() => {
        const scrollPosition = window.scrollY;
        const headerOffset = Math.max(0, 32 - scrollPosition);
        headerRef.current?.style.setProperty(
          '--home-header-offset',
          `${headerOffset}px`,
        );
        setIsScrolled(scrollPosition > 300);
      });
    };

    updateScrollState();
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
        ref={headerRef}
      >
        <div className='site-shell site-header-inner'>
          <Link
            aria-label='dobby_min 개발 블로그 홈'
            className='wordmark'
            href={ROUTES_PATH.HOME}
            transitionTypes={
              variant === 'article' ? ['article-back'] : undefined
            }
          >
            dobby_min
          </Link>
          <nav aria-label='주요 내비게이션' className='desktop-nav'>
            <Link href={ROUTES_PATH.ARTICLES}>Articles</Link>
            <Link href={ROUTES_PATH.ABOUT}>About</Link>
          </nav>
          <div className='header-actions'>
            <Button
              aria-label='글 검색'
              className='icon-button'
              onClick={openSearch}
              size='icon'
              type='button'
              variant='ghost'
            >
              <Search className='size-5' size={20} strokeWidth={2} />
            </Button>
            <ThemeToggle />
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
};
