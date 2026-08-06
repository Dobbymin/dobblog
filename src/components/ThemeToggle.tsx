'use client';

import { SunMoon } from 'lucide-react';

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
    <button
      aria-label='테마 전환'
      className='icon-button'
      onClick={toggleTheme}
      type='button'
    >
      <SunMoon size={18} strokeWidth={2.25} />
    </button>
  );
}
