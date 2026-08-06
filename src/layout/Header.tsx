import { postSummaries } from '@/lib/posts';

import { HeaderClient } from './HeaderClient';

type HeaderProps = {
  variant?: 'default' | 'home' | 'article' | 'about';
};

export const Header = ({ variant = 'default' }: HeaderProps) => (
  <HeaderClient searchPosts={postSummaries} variant={variant} />
);
