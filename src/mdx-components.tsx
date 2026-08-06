import { Children, type ReactNode, isValidElement } from 'react';

import { toAnchorId } from '@/lib/toc';
import type { MDXComponents } from 'mdx/types';

function toText(children: ReactNode): string {
  return Children.toArray(children)
    .map((child) => {
      if (typeof child === 'string') return child;
      if (isValidElement<{ children?: ReactNode }>(child)) {
        return toText(child.props.children);
      }
      return '';
    })
    .join('');
}

const components = {
  h2: ({ children }: { children?: ReactNode }) => {
    const heading = toText(children);
    return <h2 id={toAnchorId(heading)}>{children}</h2>;
  },
} satisfies MDXComponents;

export function useMDXComponents(): MDXComponents {
  return components;
}
