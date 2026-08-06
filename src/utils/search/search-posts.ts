import type { PostMetadata } from '@/types';

const normalize = (value: string) => value.toLocaleLowerCase('ko');

export function searchPosts(posts: PostMetadata[], query: string) {
  const tokens = query.trim().split(/\s+/).filter(Boolean).map(normalize);
  if (!tokens.length) return [];

  return posts.filter((post) => {
    const searchableText = normalize(
      [post.title, post.description, ...post.tags, ...post.headings].join(' '),
    );

    return tokens.every((token) => searchableText.includes(token));
  });
}
