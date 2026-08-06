import Link from 'next/link';

import { CloudSection } from '@/components';
import {
  DYNAMIC_ROUTES_PATH,
  EXTERNAL_ROUTES_PATH,
  ROUTES_PATH,
} from '@/constants';
import { postCategories } from '@/lib/posts';
import { Code2, Rss } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className='site-footer'>
      <CloudSection sectionBgColor='var(--background)' />
      <div className='footer-content'>
        <div className='site-shell'>
          <div className='footer-intro'>
            <Link className='wordmark' href={ROUTES_PATH.HOME}>
              dobbymin<span>’s</span>
            </Link>
            <p>인생은 프레임워크처럼, 공부는 라이브러리처럼</p>
          </div>
          <div className='footer-grid'>
            <div>
              <h2>Browse By Category</h2>
              <ul>
                {postCategories.map((category) => (
                  <li key={category}>
                    <Link
                      href={DYNAMIC_ROUTES_PATH.ARTICLES({ tag: category })}
                    >
                      {category}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2>Explore</h2>
              <ul>
                <li>
                  <Link href={ROUTES_PATH.ARTICLES}>Articles</Link>
                </li>
                <li>
                  <Link href={ROUTES_PATH.ABOUT}>About</Link>
                </li>
              </ul>
            </div>
            <div>
              <h2>Elsewhere</h2>
              <div className='footer-icons'>
                <a
                  aria-label='GitHub'
                  href={EXTERNAL_ROUTES_PATH.GITHUB}
                  rel='noreferrer'
                  target='_blank'
                >
                  <Code2 size={20} />
                </a>
                <a aria-label='RSS feed' href={ROUTES_PATH.RSS}>
                  <Rss size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className='site-shell footer-bottom'>
          © 2026 dobbymin. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
