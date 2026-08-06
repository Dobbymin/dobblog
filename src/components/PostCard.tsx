import Link from 'next/link';

import { Badge } from '@/components/ui';
import { DYNAMIC_ROUTES_PATH } from '@/constants';
import { type PostMetadata, formatDate } from '@/lib/posts';
import { ArrowUpRight } from 'lucide-react';

type PostCardProps = {
  post: PostMetadata;
  variant?: 'compact' | 'default';
};

export function PostCard({ post, variant = 'default' }: PostCardProps) {
  return (
    <article className={`post-card post-card-${variant}`}>
      <div className='post-card-meta'>
        <time dateTime={post.date}>{formatDate(post.date)}</time>
        <span>{post.readingTime}</span>
      </div>
      <h3>
        <Link
          href={DYNAMIC_ROUTES_PATH.ARTICLE(post.slug)}
          transitionTypes={['article-forward']}
        >
          {post.title}
          <ArrowUpRight aria-hidden='true' size={18} strokeWidth={2.25} />
        </Link>
      </h3>
      <p>{post.description}</p>
      <div aria-label='태그' className='tag-list'>
        {post.tags.map((tag) => (
          <Badge key={tag} variant='secondary'>
            {tag}
          </Badge>
        ))}
      </div>
    </article>
  );
}
