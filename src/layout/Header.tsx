import { HeaderClient } from './HeaderClient';

type HeaderProps = {
  variant?: 'default' | 'home' | 'article' | 'about';
};

export const Header = ({ variant = 'default' }: HeaderProps) => (
  <HeaderClient variant={variant} />
);
