import { getSortedPostsData } from '@/lib/posts';
import { pageMetadata } from '@/lib/seo';
import PageHeader from '@/app/components/PageHeader';
import BlogList from '@/app/components/BlogList';

export const metadata = pageMetadata('Writing on Code, AI & Life', 'Articles by Kevin Zhong on agent engineering, AI, home labs, web development, books, and everyday life.', '/blog');

export default function Blog() {
    const posts = getSortedPostsData();
    return <div className="page-wrapper">
        <PageHeader title="Writing" eyebrow="Notes & observations" description="Thoughts on code, design, and the spaces in between." />
        <BlogList posts={posts} filterable />
    </div>;
}
