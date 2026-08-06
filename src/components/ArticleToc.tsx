import { toAnchorId } from '@/lib/toc';

type ArticleTocProps = {
  headings: string[];
};

export function ArticleToc({ headings }: ArticleTocProps) {
  if (!headings.length) return null;

  return (
    <nav aria-label='Table of Contents' className='article-toc'>
      <h2>Table of Contents</h2>
      <ol>
        {headings.map((heading) => (
          <li key={heading}>
            <a href={`#${toAnchorId(heading)}`}>{heading}</a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
