import Link from 'next/link';

import { MobileNav, ThemeToggle } from '@/components';

export const Header = () => {
  return (
    <header className='site-header'>
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
          <ThemeToggle />
          <MobileNav />
        </div>
      </div>
    </header>
  );
};
