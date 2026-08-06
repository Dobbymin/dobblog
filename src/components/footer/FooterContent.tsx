import Link from 'next/link';

import { EXTERNAL_ROUTES_PATH, ROUTES_PATH } from '@/constants';
import { Rss } from 'lucide-react';

import { CloudSection, GithubIcon, LinkedInIcon, ThemeToggle } from '../common';

type Props = {
  categories: string[];
  showThemeToggle?: boolean;
};

export function FooterContent({ categories, showThemeToggle = true }: Props) {
  return (
    <footer className='site-footer'>
      <CloudSection sectionBgColor='var(--background)' />
      <div className='footer-content'>
        <div className='site-shell footer-layout'>
          <div className='footer-intro' id='about'>
            <Link className='wordmark' href={ROUTES_PATH.HOME}>
              dobby_min
            </Link>
            <p>인생은 프레임워크처럼, 공부는 라이브러리처럼</p>
          </div>

          <div className='footer-navigation'>
            <div className='footer-category'>
              <h2>Category</h2>
              <ul>
                {categories.map((category) => (
                  <li key={category}>
                    <span>{category}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2>General</h2>
              <ul>
                <li>
                  <Link href={ROUTES_PATH.ABOUT}>About</Link>
                </li>
                <li>
                  <a href={ROUTES_PATH.RSS}>RSS Feed</a>
                </li>
              </ul>
            </div>
          </div>

          <div className='footer-icons'>
            {showThemeToggle ? <ThemeToggle /> : null}
            <a aria-label='RSS feed' href={ROUTES_PATH.RSS}>
              <Rss size={20} />
            </a>
            <a
              aria-label='LinkedIn'
              href={EXTERNAL_ROUTES_PATH.LINKEDIN}
              rel='noreferrer'
              target='_blank'
            >
              <LinkedInIcon height={20} width={20} />
            </a>
            <a
              aria-label='GitHub'
              href={EXTERNAL_ROUTES_PATH.GITHUB}
              rel='noreferrer'
              target='_blank'
            >
              <GithubIcon height={20} width={20} />
            </a>
          </div>

          <p className='footer-bottom'>© 2026 dobbymin. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
