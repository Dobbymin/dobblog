'use client';

import { useState } from 'react';

import { SunMoon } from 'lucide-react';

type Theme = 'dark' | 'light';

const storageKey = 'dobbymin-color-theme';

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(() =>
    typeof document !== 'undefined' &&
    document.documentElement.classList.contains('dark')
      ? 'dark'
      : 'light',
  );

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    document.documentElement.classList.toggle('dark', nextTheme === 'dark');
    window.localStorage.setItem(storageKey, nextTheme);
    setTheme(nextTheme);
  };

  return (
    <button
      aria-label={theme === 'light' ? '다크 모드로 전환' : '라이트 모드로 전환'}
      className='icon-button'
      onClick={toggleTheme}
      type='button'
    >
      <SunMoon size={18} strokeWidth={2.25} />
    </button>
  );
}
