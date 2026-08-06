import {
  Children,
  type ComponentPropsWithoutRef,
  type ReactNode,
  isValidElement,
} from 'react';

import { toAnchorId } from '@/utils';
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
  h3: ({ children }: { children?: ReactNode }) => {
    const heading = toText(children);
    return <h3 id={toAnchorId(heading)}>{children}</h3>;
  },
  h4: ({ children }: { children?: ReactNode }) => {
    const heading = toText(children);
    return <h4 id={toAnchorId(heading)}>{children}</h4>;
  },
  h5: ({ children }: { children?: ReactNode }) => {
    const heading = toText(children);
    return <h5 id={toAnchorId(heading)}>{children}</h5>;
  },
  h6: ({ children }: { children?: ReactNode }) => {
    const heading = toText(children);
    return <h6 id={toAnchorId(heading)}>{children}</h6>;
  },
  img: (props: ComponentPropsWithoutRef<'img'>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img {...props} alt={props.alt ?? ''} loading='lazy' />
  ),
  YouTube: ({
    alt,
    title,
    videoId,
  }: {
    alt?: string;
    title?: string;
    videoId: string;
  }) => (
    <div className='youtube-embed'>
      <iframe
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
        allowFullScreen
        loading='lazy'
        referrerPolicy='strict-origin-when-cross-origin'
        src={`https://www.youtube-nocookie.com/embed/${videoId}`}
        title={title ?? alt ?? 'YouTube video'}
      />
    </div>
  ),
} satisfies MDXComponents;

export function useMDXComponents(): MDXComponents {
  return components;
}
