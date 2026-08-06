import Link from 'next/link';

import { CloudSection, HeroArtwork } from '@/components';
import { Code2, Rss } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className='site-footer'>
      <div className='footer-clouds'>
        <CloudSection sectionBgColor='var(--color-footer)' />
        <HeroArtwork variant='footer' />
      </div>
      <div className='footer-content'>
        <div className='site-shell footer-grid'>
          <div>
            <Link className='wordmark' href='/'>
              dobbymin<span>’s</span>
            </Link>
            <p>개발 경험을 기록합니다.</p>
          </div>
          <div>
            <h2>Browse By Category</h2>
            <ul>
              <li>
                <Link href='/articles?tag=AI'>AI</Link>
              </li>
              <li>
                <Link href='/articles?tag=Terminal'>Terminal</Link>
              </li>
              <li>
                <Link href='/articles?tag=Workflow'>Workflow</Link>
              </li>
              <li>
                <Link href='/articles?tag=CLI'>CLI</Link>
              </li>
            </ul>
          </div>
          <div>
            <h2>Explore</h2>
            <ul>
              <li>
                <Link href='/articles'>Articles</Link>
              </li>
              <li>
                <Link href='/about'>About</Link>
              </li>
              <li>
                <a
                  href='https://wiki.dobbymin.cloud/'
                  rel='noreferrer'
                  target='_blank'
                >
                  Wiki
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h2>Elsewhere</h2>
            <div className='footer-icons'>
              <a
                aria-label='GitHub'
                href='https://github.com/dobbymin'
                rel='noreferrer'
                target='_blank'
              >
                <Code2 size={20} />
              </a>
              <a aria-label='RSS feed' href='/rss.xml'>
                <Rss size={20} />
              </a>
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
