import type { ReactNode } from 'react';
import { ViewTransition } from 'react';

type PageTransitionProps = {
  children: ReactNode;
};

export function PageTransition({ children }: PageTransitionProps) {
  return <ViewTransition default='none'>{children}</ViewTransition>;
}
