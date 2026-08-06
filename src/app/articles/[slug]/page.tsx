import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { ArticleToc } from '@/components';
import { DYNAMIC_ROUTES_PATH } from '@/constants';
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
          <h1>{post.title}</h1>
          <dl className='article-meta'>
            <dt>Filed under</dt>
            <dd>{post.tags[0]}</dd>
            <dt>on</dt>
            <dd>
              <time dateTime={post.date}>{formatDate(post.date)}</time>
            </dd>
          </dl>
        </header>
        <div className='article-layout'>
          <article className='prose'>
            <Content />
          </article>
          <ArticleToc headings={post.headings} />
        </div>
        <nav aria-label='글 탐색' className='article-pagination'>
          {previousPost ? (
            <Link href={DYNAMIC_ROUTES_PATH.ARTICLE(previousPost.slug)}>
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
