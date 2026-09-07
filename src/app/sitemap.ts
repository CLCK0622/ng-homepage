import type { MetadataRoute } from 'next';
import { getSortedPostsData } from '@/lib/posts';
import { SITE_URL } from '@/lib/constants';
import { topics } from '@/lib/topics';
import { caseStudies } from '@/lib/caseStudies';

// Update when these pages' content changes, not on every deployment.
const pagesUpdated = '2026-09-07';

export default function sitemap(): MetadataRoute.Sitemap {
    const routes = ['', '/portfolio', '/gallery', '/blog', '/about', ...topics.map(topic => `/blog/topics/${topic.slug}`), ...caseStudies.map(project => `/portfolio/${project.slug}`)];
    return [
        ...routes.map(route => ({ url: `${SITE_URL}${route}`, lastModified: pagesUpdated })),
        ...getSortedPostsData().map(post => ({ url: `${SITE_URL}/blog/${post.id}`, ...(post.updated ? { lastModified: post.updated } : {}) })),
    ];
}
