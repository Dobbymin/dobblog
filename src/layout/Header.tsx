'use client';

import Link from 'next/link';

import { useEffect, useState } from 'react';

import { MobileNav, ThemeToggle } from '@/components';
import { Rss, Search } from 'lucide-react';

type HeaderProps = {
  variant?: 'default' | 'home';
};

export const Header = ({ variant = 'default' }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);

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
      className={`site-header ${variant === 'home' ? 'home-site-header' : ''} ${isScrolled ? 'is-scrolled' : ''}`}
    >
      <div className='site-shell site-header-inner'>
        <Link
          aria-label='dobbymin 개발 블로그 홈'
          className='wordmark'
          href='/'
        >
          dobbymin<span>’s</span>
        </Link>
        <nav aria-label='주요 내비게이션' className='desktop-nav'>
          <Link href='/articles'>Articles</Link>
          <Link href='/about'>About</Link>
          <a
            href='https://wiki.dobbymin.cloud/'
            rel='noreferrer'
            target='_blank'
          >
            Wiki
          </a>
        </nav>
        <div className='header-actions'>
          <div className='header-utility'>
            <Link
              aria-label='글 검색'
              className='icon-button'
              href='/articles'
            >
              <Search size={18} strokeWidth={2.25} />
            </Link>
            <a aria-label='RSS feed' className='icon-button' href='/rss.xml'>
              <Rss size={18} strokeWidth={2.25} />
            </a>
          </div>
          <ThemeToggle />
          <MobileNav />
        </div>
      </div>
    </header>
  );
};
