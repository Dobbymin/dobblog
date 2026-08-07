'use client';

import { useRouter } from 'next/navigation';

import { useState } from 'react';

import { EXTERNAL_ROUTES_PATH, ROUTES_PATH } from '@/constants';
import { Menu, X } from 'lucide-react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
} from '../ui';

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleValueChange = (value: string | null) => {
    if (value === 'about') {
      router.push(ROUTES_PATH.ABOUT, {
        transitionTypes: ['article-forward'],
      });
    }

    if (value === 'linkedin' || value === 'github') {
      window.open(
        value === 'linkedin'
          ? EXTERNAL_ROUTES_PATH.LINKEDIN
          : EXTERNAL_ROUTES_PATH.GITHUB,
        '_blank',
        'noopener,noreferrer',
      );
    }
  };

  return (
    <div className='mobile-nav'>
      <Select
        modal={false}
        onOpenChange={setIsOpen}
        onValueChange={handleValueChange}
        open={isOpen}
      >
        <SelectTrigger
          aria-label={isOpen ? '메뉴 닫기' : '메뉴 열기'}
          className='icon-button mobile-nav-trigger [&>svg:last-child]:hidden'
        >
          {isOpen ? (
            <X className='size-5' size={20} />
          ) : (
            <Menu className='size-5' size={20} />
          )}
        </SelectTrigger>
        <SelectContent
          align='end'
          className='mobile-nav-content min-w-48'
          side='bottom'
        >
          <SelectItem className='mobile-nav-item' value='linkedin'>
            LinkedIn
          </SelectItem>
          <SelectSeparator className='mobile-nav-separator' />
          <SelectItem className='mobile-nav-item' value='github'>
            GitHub
          </SelectItem>
          <SelectSeparator className='mobile-nav-separator' />
          <SelectItem className='mobile-nav-item' value='about'>
            About
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
