import type { NextConfig } from 'next';

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

export default nextConfig;
