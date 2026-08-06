import type { ComponentType } from 'react';

import ApexChart, {
  metadata as ApexChartMetadata,
} from '@/content/articles/apex-chart.mdx';
import BffWithUpbit, {
  metadata as BffWithUpbitMetadata,
} from '@/content/articles/bff-with-upbit.mdx';
import BlogOpen, {
  metadata as BlogOpenMetadata,
} from '@/content/articles/blog-open.mdx';
import DatabaseBasic, {
  metadata as DatabaseBasicMetadata,
} from '@/content/articles/database-basic.mdx';
import DesignSystem, {
  metadata as DesignSystemMetadata,
} from '@/content/articles/design-system.mdx';
import DomApi, {
  metadata as DomApiMetadata,
} from '@/content/articles/dom-api.mdx';
import EfficientTokenManagement, {
  metadata as EfficientTokenManagementMetadata,
} from '@/content/articles/efficient-token-management.mdx';
import ExpressRoutes, {
  metadata as ExpressRoutesMetadata,
} from '@/content/articles/express-routes.mdx';
import ExpressVercel, {
  metadata as ExpressVercelMetadata,
} from '@/content/articles/express-vercel.mdx';
import JavascriptCallback, {
  metadata as JavascriptCallbackMetadata,
} from '@/content/articles/javascript-callback.mdx';
import JavascriptConstructorFunction, {
  metadata as JavascriptConstructorFunctionMetadata,
} from '@/content/articles/javascript-constructor-function.mdx';
import JavascriptTdz, {
  metadata as JavascriptTdzMetadata,
} from '@/content/articles/javascript-tdz.mdx';
import Jenkins, {
  metadata as JenkinsMetadata,
} from '@/content/articles/jenkins.mdx';
import NextJsRender, {
  metadata as NextJsRenderMetadata,
} from '@/content/articles/next.js-render.mdx';
import PackageManager, {
  metadata as PackageManagerMetadata,
} from '@/content/articles/package-manager.mdx';
import PrAutoGenerate, {
  metadata as PrAutoGenerateMetadata,
} from '@/content/articles/pr-auto-generate.mdx';
import PrdWirte, {
  metadata as PrdWirteMetadata,
} from '@/content/articles/prd-wirte.mdx';
import ReactCompiler, {
  metadata as ReactCompilerMetadata,
} from '@/content/articles/react-compiler.mdx';
import ReactRouterUsematch, {
  metadata as ReactRouterUsematchMetadata,
} from '@/content/articles/react-router-usematch.mdx';
import ReactServerComponents, {
  metadata as ReactServerComponentsMetadata,
} from '@/content/articles/react-server-components.mdx';
import SsrVsCsr, {
  metadata as SsrVsCsrMetadata,
} from '@/content/articles/ssr-vs-csr.mdx';
import TechSpec, {
  metadata as TechSpecMetadata,
} from '@/content/articles/tech-spec.mdx';
import Vercel, {
  metadata as VercelMetadata,
} from '@/content/articles/vercel.mdx';
import ZustandMiddleware, {
  metadata as ZustandMiddlewareMetadata,
} from '@/content/articles/zustand-middleware.mdx';
import type { Post, PostMetadata } from '@/types';

const toPost = (
  metadata: Record<string, unknown>,
  Content: ComponentType,
): Post => ({
  ...(metadata as PostMetadata),
  Content,
});

export const posts = [
  toPost(ApexChartMetadata, ApexChart),
  toPost(BffWithUpbitMetadata, BffWithUpbit),
  toPost(BlogOpenMetadata, BlogOpen),
  toPost(DatabaseBasicMetadata, DatabaseBasic),
  toPost(DesignSystemMetadata, DesignSystem),
  toPost(DomApiMetadata, DomApi),
  toPost(EfficientTokenManagementMetadata, EfficientTokenManagement),
  toPost(ExpressRoutesMetadata, ExpressRoutes),
  toPost(ExpressVercelMetadata, ExpressVercel),
  toPost(JavascriptCallbackMetadata, JavascriptCallback),
  toPost(JavascriptConstructorFunctionMetadata, JavascriptConstructorFunction),
  toPost(JavascriptTdzMetadata, JavascriptTdz),
  toPost(JenkinsMetadata, Jenkins),
  toPost(NextJsRenderMetadata, NextJsRender),
  toPost(PackageManagerMetadata, PackageManager),
  toPost(PrAutoGenerateMetadata, PrAutoGenerate),
  toPost(PrdWirteMetadata, PrdWirte),
  toPost(ReactCompilerMetadata, ReactCompiler),
  toPost(ReactRouterUsematchMetadata, ReactRouterUsematch),
  toPost(ReactServerComponentsMetadata, ReactServerComponents),
  toPost(SsrVsCsrMetadata, SsrVsCsr),
  toPost(TechSpecMetadata, TechSpec),
  toPost(VercelMetadata, Vercel),
  toPost(ZustandMiddlewareMetadata, ZustandMiddleware),
].sort((a, b) => b.date.localeCompare(a.date));

export const postCategories = Array.from(
  new Set(posts.flatMap((post) => post.tags)),
).sort();

export const postSummaries: PostMetadata[] = posts.map((post) => ({
  date: post.date,
  description: post.description,
  headings: post.headings,
  readingTime: post.readingTime,
  slug: post.slug,
  tags: post.tags,
  title: post.title,
}));

export function getPost(slug: string) {
  return posts.find((post) => post.slug === slug);
}
