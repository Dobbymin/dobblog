'use client';

import Link from 'next/link';

import { useEffect, useRef, useState } from 'react';

import { Menu, X } from 'lucide-react';

const focusableSelector =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);

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
      <button
        aria-controls='mobile-navigation'
        aria-expanded={isOpen}
        aria-label='메뉴 열기'
        className='icon-button'
        onClick={() => setIsOpen(true)}
        type='button'
      >
        <Menu size={21} />
      </button>
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
              <button
                aria-label='메뉴 닫기'
                className='icon-button'
                onClick={() => setIsOpen(false)}
                type='button'
              >
                <X size={21} />
              </button>
            </div>
            <nav>
              <Link href='/articles' onClick={() => setIsOpen(false)}>
                Articles
              </Link>
              <Link href='/about' onClick={() => setIsOpen(false)}>
                About
              </Link>
              <a
                href='https://github.com/dobbymin'
                rel='noreferrer'
                target='_blank'
              >
                GitHub
              </a>
              <a
                href='https://wiki.dobbymin.cloud/'
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
