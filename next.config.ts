/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
            },
            {
                protocol: 'https',
                hostname: 's2.loli.net',
            },
            {
                protocol: 'https',
                hostname: 'assets.vercel.com',
            },
            {
                protocol: 'https',
                hostname: 'raw.githubusercontent.com',
            },
            {
                protocol: 'https',
                hostname: 'user-images.githubusercontent.com',
            },
            {
                protocol: 'https',
                hostname: 'i.redd.it',
            },
            {
                protocol: 'https',
                hostname: 'github.com',
            },
        ],
    },
}

module.exports = nextConfig