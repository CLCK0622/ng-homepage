import RSS from 'rss';
import { getSortedPostsData } from '@/lib/posts';
import { SITE_URL, SITE_TITLE, SITE_DESCRIPTION } from '@/lib/constants';

export async function GET() {
    const allPosts = getSortedPostsData();

    const feed = new RSS({
        title: SITE_TITLE,
        description: SITE_DESCRIPTION,
        site_url: SITE_URL,
        feed_url: `${SITE_URL}/rss.xml`,
        language: 'en',
        pubDate: new Date(),
        copyright: `All rights reserved ${new Date().getFullYear()}, Kevin Zhong`,
    });

    allPosts.forEach((post) => {
        feed.item({
            title: post.title,
            description: post.description,
            url: `${SITE_URL}/blog/${post.id}`,
            date: post.date,
            author: 'Kevin Zhong',
            categories: post.tags || [],
        });
    });

    return new Response(feed.xml({ indent: true }), {
        headers: {
            'Content-Type': 'text/xml',
            'Cache-Control': 's-maxage=60, stale-while-revalidate',
        },
    });
}