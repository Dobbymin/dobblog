import { toAnchorId } from '@/utils';

type Props = {
  headings: string[];
};

export function ArticleToc({ headings }: Props) {
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
