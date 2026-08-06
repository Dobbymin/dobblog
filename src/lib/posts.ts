import type { ComponentType } from 'react';

import BitcoinStrategy, {
  metadata as bitcoinStrategyMetadata,
} from '@/content/articles/bitcoin-ma-strategy.mdx';
import CavemanSkill, {
  metadata as cavemanSkillMetadata,
} from '@/content/articles/caveman-skill.mdx';
import ClaudeMd, {
  metadata as claudeMdMetadata,
} from '@/content/articles/claude-md.mdx';
import GhosttySsh, {
  metadata as ghosttySshMetadata,
} from '@/content/articles/ghostty-ssh.mdx';
import RtkSkill, {
  metadata as rtkSkillMetadata,
} from '@/content/articles/rtk-skill.mdx';
import SkillMakingGuide, {
  metadata as skillMakingGuideMetadata,
} from '@/content/articles/skill-making-guide.mdx';

export type PostMetadata = {
  slug: string;
  title: string;
  description: string;
  date: string;
  readingTime: string;
  tags: string[];
};

export type Post = PostMetadata & {
  Content: ComponentType;
};

const toPost = (
  metadata: Record<string, unknown>,
  Content: ComponentType,
): Post => ({
  ...(metadata as PostMetadata),
  Content,
});

export const posts = [
  toPost(ghosttySshMetadata, GhosttySsh),
  toPost(cavemanSkillMetadata, CavemanSkill),
  toPost(rtkSkillMetadata, RtkSkill),
  toPost(skillMakingGuideMetadata, SkillMakingGuide),
  toPost(bitcoinStrategyMetadata, BitcoinStrategy),
  toPost(claudeMdMetadata, ClaudeMd),
].sort((a, b) => b.date.localeCompare(a.date));

export function getPost(slug: string) {
  return posts.find((post) => post.slug === slug);
}

export function formatDate(date: string) {
  return new Intl.DateTimeFormat('ko-KR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(`${date}T00:00:00+09:00`));
}
