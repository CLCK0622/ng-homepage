import { MetadataRoute } from 'next';
import { getSortedPostsData } from '@/lib/posts';
import { SITE_URL } from '@/lib/constants';

export default function sitemap(): MetadataRoute.Sitemap {
    const allPosts = getSortedPostsData();

    const routes = [
        '',
        '/portfolio',
        '/blog',
        '/about',
    ].map((route) => ({
        url: `${SITE_URL}${route}`,
        lastModified: new Date().toISOString().split('T')[0],
        changeFrequency: 'monthly' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    const blogRoutes = allPosts.map((post) => ({
        url: `${SITE_URL}/blog/${post.id}`,
        lastModified: post.date,
        changeFrequency: 'weekly' as const,
        priority: 0.6,
    }));

    return [...routes, ...blogRoutes];
}