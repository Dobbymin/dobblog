import type { ComponentType } from 'react';

export type PostMetadata = {
  slug: string;
  title: string;
  description: string;
  date: string;
  readingTime: string;
  tags: string[];
  headings: string[];
};

export type Post = PostMetadata & {
  Content: ComponentType;
};
