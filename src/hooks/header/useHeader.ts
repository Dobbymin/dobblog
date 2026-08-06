import { useCallback, useEffect, useRef, useState } from 'react';

import type { HeaderVariant } from '@/types';

export function useHeader(variant: HeaderVariant) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const searchTriggerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (variant !== 'home' && variant !== 'about') return;

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

  const openSearch = useCallback(() => {
    searchTriggerRef.current = document.activeElement as HTMLElement | null;
    setIsSearchOpen(true);
  }, []);

  const closeSearch = useCallback(() => {
    setIsSearchOpen(false);
    window.requestAnimationFrame(() => searchTriggerRef.current?.focus());
  }, []);

  return {
    closeSearch,
    headerRef,
    isScrolled,
    isSearchOpen,
    openSearch,
  };
}
