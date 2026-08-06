import type { ReactNode } from 'react';
import { ViewTransition } from 'react';

type Props = {
  children: ReactNode;
};

export function PageTransition({ children }: Props) {
  return <ViewTransition default='none'>{children}</ViewTransition>;
}
