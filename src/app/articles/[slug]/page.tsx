import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { ArticleContent, PageTransition } from '@/components';
import { Footer, Header } from '@/layout';
import { getPost, posts } from '@/libs';

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return posts.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  return {
    title: `${post.title} | dobbymin`,
    description: post.description,
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const index = posts.findIndex((item) => item.slug === post.slug);
  const previousPost = posts[index + 1];
  const nextPost = posts[index - 1];
  return (
    <PageTransition>
      <div className='route-transition-page'>
        <div className='article-detail-page'>
          <Header variant='article' />
          <ArticleContent
            nextPost={nextPost}
            post={post}
            previousPost={previousPost}
          />
        </div>
        <Footer />
      </div>
    </PageTransition>
  );
}
