/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/auth/:path',
                destination: '/:path',
            },
        ];
    },
    async redirects() {
        return [
            {
                source: '/',
                destination: '/auth',
                permanent: true,
            },
        ];
    },
};

module.exports = nextConfig;
