import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { Footer, Header } from '@/layout';
import { formatDate, getPost, posts } from '@/lib/posts';
import { ArrowLeft, ArrowRight } from 'lucide-react';

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return posts.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  return {
    title: `${post.title} | dobbymin`,
    description: post.description,
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const index = posts.findIndex((item) => item.slug === post.slug);
  const previousPost = posts[index + 1];
  const nextPost = posts[index - 1];
  const { Content } = post;

  return (
    <>
      <Header />
      <main className='site-shell article-page'>
        <header className='article-header'>
          <Link className='back-link' href='/articles'>
            <ArrowLeft size={16} /> Articles
          </Link>
          <div className='post-card-meta'>
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span>{post.readingTime}</span>
          </div>
          <h1>{post.title}</h1>
          <p>{post.description}</p>
          <div className='tag-list'>
            {post.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </header>
        <article className='prose'>
          <Content />
        </article>
        <nav aria-label='글 탐색' className='article-pagination'>
          {previousPost ? (
            <Link href={`/articles/${previousPost.slug}`}>
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
              href={`/articles/${nextPost.slug}`}
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
      </main>
      <Footer />
    </>
  );
}
