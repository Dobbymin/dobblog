'use client';

import { SunMoon } from 'lucide-react';

import { Button } from '../ui';

const storageKey = 'dobbymin-color-theme';

export function ThemeToggle() {
  const toggleTheme = () => {
    const nextTheme = document.documentElement.classList.contains('dark')
      ? 'light'
      : 'dark';
    document.documentElement.classList.toggle('dark', nextTheme === 'dark');
    window.localStorage.setItem(storageKey, nextTheme);
  };

  return (
    <Button
      aria-label='테마 전환'
      className='icon-button'
      onClick={toggleTheme}
      size='icon'
      type='button'
      variant='ghost'
    >
      <SunMoon className='size-5' size={20} strokeWidth={2} />
    </Button>
  );
}
