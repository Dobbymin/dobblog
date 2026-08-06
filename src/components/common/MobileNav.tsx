'use client';

import Link from 'next/link';

import { useEffect, useRef, useState } from 'react';

import { Button } from '@/components/ui';
import {
  EXTERNAL_ROUTES_PATH,
  ROUTES_PATH,
} from '@/constants';
import { Menu, X } from 'lucide-react';

const focusableSelector =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

type MobileNavProps = {
  onSearch: () => void;
};

export function MobileNav({ onSearch }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const firstFocusable =
      dialogRef.current?.querySelector<HTMLElement>(focusableSelector);
    firstFocusable?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
      if (event.key !== 'Tab' || !dialogRef.current) return;

      const elements = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(focusableSelector),
      );
      const first = elements.at(0);
      const last = elements.at(-1);
      if (!first || !last) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isOpen]);

  return (
    <div className='mobile-nav'>
      <Button
        aria-controls='mobile-navigation'
        aria-expanded={isOpen}
        aria-label='메뉴 열기'
        className='icon-button'
        onClick={() => setIsOpen(true)}
        ref={menuButtonRef}
        size='icon'
        type='button'
        variant='ghost'
      >
        <Menu size={21} />
      </Button>
      {isOpen && (
        <div
          className='mobile-nav-overlay'
          onMouseDown={() => setIsOpen(false)}
        >
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
              <span>dobbymin</span>
              <Button
                aria-label='메뉴 닫기'
                className='icon-button'
                onClick={() => setIsOpen(false)}
                size='icon'
                type='button'
                variant='ghost'
              >
                <X size={21} />
              </Button>
            </div>
            <nav>
              <button
                onClick={() => {
                  setIsOpen(false);
                  menuButtonRef.current?.focus();
                  onSearch();
                }}
                type='button'
              >
                Search
              </button>
              <Link href={ROUTES_PATH.ARTICLES} onClick={() => setIsOpen(false)}>
                Articles
              </Link>
              <Link href={ROUTES_PATH.ABOUT} onClick={() => setIsOpen(false)}>
                About
              </Link>
              <a
                href={EXTERNAL_ROUTES_PATH.GITHUB}
                rel='noreferrer'
                target='_blank'
              >
                GitHub
              </a>
              <a
                href={EXTERNAL_ROUTES_PATH.WIKI}
                rel='noreferrer'
                target='_blank'
              >
                Wiki
              </a>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}
