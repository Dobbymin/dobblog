import { toAnchorId } from '@/lib/toc';
import { List } from 'lucide-react';

type ArticleTocProps = {
  headings: string[];
};

export function ArticleToc({ headings }: ArticleTocProps) {
  if (!headings.length) return null;

  return (
    <aside className='article-toc'>
      <p>
        <List aria-hidden='true' size={15} /> On this page
      </p>
      <ol>
        {headings.map((heading) => (
          <li key={heading}>
            <a href={`#${toAnchorId(heading)}`}>{heading}</a>
          </li>
        ))}
      </ol>
    </aside>
  );
}
