import Link from 'next/link';

import { type Post, formatDate } from '@/lib/posts';
import { ArrowUpRight } from 'lucide-react';

type PostCardProps = {
  post: Post;
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
        <Link href={`/articles/${post.slug}`}>
          {post.title}
          <ArrowUpRight aria-hidden='true' size={18} strokeWidth={2.25} />
        </Link>
      </h3>
      <p>{post.description}</p>
      <div aria-label='태그' className='tag-list'>
        {post.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
    </article>
  );
}
