import { HeaderClient } from './HeaderClient';

type HeaderProps = {
  variant?: 'default' | 'home' | 'article';
};

export const Header = ({ variant = 'default' }: HeaderProps) => (
  <HeaderClient variant={variant} />
);
