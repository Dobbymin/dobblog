import type { ReactNode } from 'react';
import { ViewTransition } from 'react';

type PageTransitionProps = {
  children: ReactNode;
};

const transitionClass = {
  'article-back': 'article-back',
  'article-forward': 'article-forward',
  default: 'none',
};

export function PageTransition({ children }: PageTransitionProps) {
  return (
    <ViewTransition
      default='none'
      enter={transitionClass}
      exit={transitionClass}
    >
      {children}
    </ViewTransition>
  );
}
