export const SITE_URL = 'https://dobbymin.github.io';

export const ROUTES_PATH = {
  HOME: '/',
  ABOUT: '/about',
  ARTICLE: '/articles/:slug',
  RSS: '/rss.xml',
  SITEMAP: '/sitemap.xml',
} as const;

export const EXTERNAL_ROUTES_PATH = {
  GITHUB: 'https://github.com/dobbymin',
  LINKEDIN: 'https://www.linkedin.com/in/dobbymin/',
} as const;

export const DYNAMIC_ROUTES_PATH = {
  ARTICLE: (slug: string) => ROUTES_PATH.ARTICLE.replace(':slug', slug),
};
