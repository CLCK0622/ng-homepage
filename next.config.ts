/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        // Cache optimized images for 31 days instead of Vercel's short default,
        // so any remaining next/image usage across the site (blog, portfolio,
        // home) re-optimizes far less often. The gallery itself bypasses Vercel
        // Image Optimization via a custom Unsplash loader (see src/lib/unsplashLoader.ts).
        minimumCacheTTL: 2678400,
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
            {
                protocol: 'https',
                hostname: 'd112y698adiu2z.cloudfront.net',
            },
            {
                protocol: 'https',
                hostname: 'img.youtube.com',
            },
            {
                protocol: 'https',
                hostname: 'ethglobal.b-cdn.net',
            },
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
            },
        ],
    },
}

module.exports = nextConfig