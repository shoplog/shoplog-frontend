/** @type {import('next').NextConfig} */
const nextConfig = {
	async rewrites() {
		return [
			{
				source: '/api/shoplog/:path*',
				destination: `${process.env.NEXT_PUBLIC_SHOPLOG_API_URL}/api/:path*`,
			},
		];
	},
};

export default nextConfig;
