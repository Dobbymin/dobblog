import type { NextConfig } from 'next';
import createMDX from '@next/mdx';

const nextConfig: NextConfig = {
  output: 'export',
  basePath: process.env.PAGES_BASE_PATH,
  images: {
    unoptimized: true,
  },
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  serverExternalPackages: ['gray-matter'],
};

const withMDX = createMDX({
  extension: /\.mdx$/,
});

export default withMDX(nextConfig);
