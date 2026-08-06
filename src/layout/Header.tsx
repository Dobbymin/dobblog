'use client';

import Link from 'next/link';

import { useEffect, useState } from 'react';

import { MobileNav, ThemeToggle } from '@/components';
import {
  EXTERNAL_ROUTES_PATH,
  ROUTES_PATH,
} from '@/constants';
import { Rss, Search, Volume2, VolumeX } from 'lucide-react';

type HeaderProps = {
  variant?: 'default' | 'home' | 'article';
};

export const Header = ({ variant = 'default' }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSoundMuted, setIsSoundMuted] = useState(false);

  useEffect(() => {
    if (variant !== 'home') return;

    const updateScrollState = () => setIsScrolled(window.scrollY > 24);
    const animationFrame = window.requestAnimationFrame(updateScrollState);
    window.addEventListener('scroll', updateScrollState, { passive: true });
    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener('scroll', updateScrollState);
    };
  }, [variant]);

  return (
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
              <Link
                aria-label='글 검색'
                className='icon-button'
                href={ROUTES_PATH.ARTICLES}
              >
                <Search size={18} strokeWidth={2.25} />
              </Link>
              <button
                aria-label={isSoundMuted ? '사운드 켜기' : '사운드 끄기'}
                className='icon-button'
                onClick={() => setIsSoundMuted((value) => !value)}
                type='button'
              >
                {isSoundMuted ? (
                  <VolumeX size={18} strokeWidth={2.25} />
                ) : (
                  <Volume2 size={18} strokeWidth={2.25} />
                )}
              </button>
              <ThemeToggle />
              <a
                aria-label='RSS feed'
                className='icon-button'
                href={ROUTES_PATH.RSS}
              >
                <Rss size={18} strokeWidth={2.25} />
              </a>
            </>
          ) : (
            <>
              <div className='header-utility'>
                <Link
                  aria-label='글 검색'
                  className='icon-button'
                  href={ROUTES_PATH.ARTICLES}
                >
                  <Search size={18} strokeWidth={2.25} />
                </Link>
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
          <MobileNav />
        </div>
      </div>
    </header>
  );
};
