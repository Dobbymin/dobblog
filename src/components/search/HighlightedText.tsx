import { Fragment } from 'react';

type Props = {
  query: string;
  text: string;
};

const normalize = (value: string) => value.toLocaleLowerCase('ko');

const escapeRegExp = (value: string) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

export function HighlightedText({ query, text }: Props) {
  const tokens = query.trim().split(/\s+/).filter(Boolean);
  if (!tokens.length) return text;

  const pattern = new RegExp(`(${tokens.map(escapeRegExp).join('|')})`, 'giu');
  const normalizedTokens = new Set(tokens.map(normalize));

  return text
    .split(pattern)
    .map((part, index) => (
      <Fragment key={`${part}-${index}`}>
        {normalizedTokens.has(normalize(part)) ? <mark>{part}</mark> : part}
      </Fragment>
    ));
}
