import { FooterContent } from '@/components';
import { postCategories } from '@/libs';

type Props = {
  showThemeToggle?: boolean;
};

export const Footer = ({ showThemeToggle = true }: Props) => (
  <FooterContent
    categories={postCategories}
    showThemeToggle={showThemeToggle}
  />
);
