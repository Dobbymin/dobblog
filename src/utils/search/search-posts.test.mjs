import assert from 'node:assert/strict';
import test from 'node:test';

import { searchPosts } from './search-posts.ts';

const posts = [
  {
    date: '2026-08-06',
    description: 'React 서버 컴포넌트 정리',
    headings: ['데이터 가져오기'],
    readingTime: '3 min',
    slug: 'react-server-components',
    tags: ['React', 'Next.js'],
    title: 'React Server Components',
  },
  {
    date: '2026-08-05',
    description: 'Express 라우팅 기초',
    headings: ['라우터 구성'],
    readingTime: '2 min',
    slug: 'express-routes',
    tags: ['Express'],
    title: 'Express의 기본 라우팅',
  },
];

test('모든 검색 토큰이 포함된 게시물만 반환한다', () => {
  assert.deepEqual(
    searchPosts(posts, 'react 데이터').map(({ slug }) => slug),
    ['react-server-components'],
  );
  assert.deepEqual(searchPosts(posts, '   '), []);
});
