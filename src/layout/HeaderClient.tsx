'use client';

import Link from 'next/link';

import { useEffect, useRef, useState } from 'react';

import { MobileNav, ThemeToggle } from '@/components';
import { EXTERNAL_ROUTES_PATH, ROUTES_PATH } from '@/constants';
import { Rss } from 'lucide-react';

type HeaderClientProps = {
  variant: 'default' | 'home' | 'article' | 'about';
};

export const HeaderClient = ({ variant }: HeaderClientProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

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

  return (
    <header
      className={`site-header ${variant === 'home' ? 'home-site-header' : ''} ${variant === 'article' ? 'article-site-header' : ''} ${variant === 'about' ? 'about-site-header' : ''} ${isScrolled ? 'is-scrolled' : ''}`}
      ref={headerRef}
    >
      <div className='site-shell site-header-inner'>
        <Link
          aria-label='dobby_min 개발 블로그 홈'
          className='wordmark'
          href={ROUTES_PATH.HOME}
          transitionTypes={variant === 'article' ? ['article-back'] : undefined}
        >
          dobby_min
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
          <Link href={ROUTES_PATH.ABOUT}>About</Link>
        </nav>
        <div className='header-actions'>
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
  );
};
