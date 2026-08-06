import type { NextConfig } from 'next';
import createMDX from '@next/mdx';

const nextConfig: NextConfig = {
	/* config options here */
	output: 'export',
	images: {
		unoptimized: true,
	},
	assetPrefix:
		process.env.NODE_ENV === 'production' ? 'https://Dobbymin.github.io' : '',
	pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
	serverExternalPackages: ['gray-matter'],
};

const withMDX = createMDX({
	extension: /\.mdx$/,
});

export default withMDX(nextConfig);
