import Link from 'next/link';

import { DYNAMIC_ROUTES_PATH } from '@/constants';
import type { PostMetadata } from '@/types';
import { ArrowLeft, ArrowRight } from 'lucide-react';

type Props = {
  nextPost?: PostMetadata;
  previousPost?: PostMetadata;
};

export function ArticlePagination({ nextPost, previousPost }: Props) {
  return (
    <nav aria-label='글 탐색' className='article-pagination'>
      {previousPost ? (
        <Link
          href={DYNAMIC_ROUTES_PATH.ARTICLE(previousPost.slug)}
          transitionTypes={['article-back']}
        >
          <ArrowLeft size={17} />
          <span>
            이전 글<strong>{previousPost.title}</strong>
          </span>
        </Link>
      ) : (
        <span />
      )}
      {nextPost ? (
        <Link
          className='next-article-link'
          href={DYNAMIC_ROUTES_PATH.ARTICLE(nextPost.slug)}
          transitionTypes={['article-forward']}
        >
          <span>
            다음 글<strong>{nextPost.title}</strong>
          </span>
          <ArrowRight size={17} />
        </Link>
      ) : (
        <span />
      )}
    </nav>
  );
}
