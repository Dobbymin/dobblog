import { HeaderContent } from '@/components';
import { postSummaries } from '@/libs';
import type { HeaderVariant } from '@/types';

type Props = {
  variant?: HeaderVariant;
};

export const Header = ({ variant = 'default' }: Props) => (
  <HeaderContent searchPosts={postSummaries} variant={variant} />
);
