import { posts } from '@/lib/posts';

export const dynamic = 'force-static';

const escapeXml = (value: string) =>
  value.replace(
    /[<>&'\"]/g,
    (character) =>
      ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&apos;',
        '"': '&quot;',
      })[character] ?? character,
  );

export function GET() {
  const items = posts
    .map(
      (post) => `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>https://dobbymin.github.io/articles/${post.slug}</link>
      <guid>https://dobbymin.github.io/articles/${post.slug}</guid>
      <description>${escapeXml(post.description)}</description>
      <pubDate>${new Date(`${post.date}T00:00:00+09:00`).toUTCString()}</pubDate>
    </item>`,
    )
    .join('');

  return new Response(
    `<?xml version="1.0" encoding="UTF-8" ?>
    <rss version="2.0">
      <channel>
        <title>dobbymin’s 개발 블로그</title>
        <link>https://dobbymin.github.io</link>
        <description>개발 경험을 기록합니다.</description>${items}
      </channel>
    </rss>`,
    {
      headers: { 'Content-Type': 'application/xml; charset=utf-8' },
    },
  );
}
