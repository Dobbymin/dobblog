export const SITE_URL = 'https://dobbymin.github.io';

export const ROUTES_PATH = {
  HOME: '/',
  ARTICLES: '/articles',
  ARTICLE: '/articles/:slug',
  ABOUT: '/about',
  RSS: '/rss.xml',
  SITEMAP: '/sitemap.xml',
} as const;

export const EXTERNAL_ROUTES_PATH = {
  GITHUB: 'https://github.com/dobbymin',
  WIKI: 'https://wiki.dobbymin.cloud/',
} as const;

type ArticlesSearchParams = Record<string, string | undefined>;

const withSearchParams = (
  pathname: string,
  searchParams: Record<string, string | undefined> = {},
) => {
  const query = new URLSearchParams(
    Object.entries(searchParams).filter(
      (entry): entry is [string, string] => Boolean(entry[1]),
    ),
  ).toString();

  return query ? `${pathname}?${query}` : pathname;
};

export const DYNAMIC_ROUTES_PATH = {
  ARTICLE: (slug: string) => ROUTES_PATH.ARTICLE.replace(':slug', slug),
  ARTICLES: (searchParams: ArticlesSearchParams = {}) =>
    withSearchParams(ROUTES_PATH.ARTICLES, searchParams),
};
