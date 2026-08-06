'use client';

import Link from 'next/link';

import { EXTERNAL_ROUTES_PATH, ROUTES_PATH } from '@/constants';
import { useMobileNav } from '@/hooks';
import { Menu, X } from 'lucide-react';

import { Button } from '../ui';

export function MobileNav() {
  const { closeMenu, dialogRef, isOpen, menuButtonRef, openMenu } =
    useMobileNav();

  return (
    <div className='mobile-nav'>
      <Button
        aria-controls='mobile-navigation'
        aria-expanded={isOpen}
        aria-label='메뉴 열기'
        className='icon-button'
        onClick={openMenu}
        ref={menuButtonRef}
        size='icon'
        type='button'
        variant='ghost'
      >
        <Menu className='size-5' size={20} />
      </Button>
      {isOpen && (
        <div className='mobile-nav-overlay' onMouseDown={closeMenu}>
          <div
            aria-label='모바일 내비게이션'
            aria-modal='true'
            className='mobile-nav-dialog'
            id='mobile-navigation'
            onMouseDown={(event) => event.stopPropagation()}
            ref={dialogRef}
            role='dialog'
          >
            <div className='mobile-nav-topline'>
              <span>dobby_min</span>
              <Button
                aria-label='메뉴 닫기'
                className='icon-button'
                onClick={closeMenu}
                size='icon'
                type='button'
                variant='ghost'
              >
                <X className='size-5' size={20} />
              </Button>
            </div>
            <nav>
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
                onClick={closeMenu}
                transitionTypes={['article-forward']}
              >
                About
              </Link>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}
