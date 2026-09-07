import Link from 'next/link';
import { notFound } from 'next/navigation';
import { topics } from '@/lib/topics';
import { getSortedPostsData } from '@/lib/posts';
import { pageMetadata } from '@/lib/seo';
import BlogList from '@/app/components/BlogList';

export const dynamicParams = false;
export function generateStaticParams() { return topics.map(topic => ({ slug: topic.slug })); }
type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props) {
    const { slug } = await params;
    const topic = topics.find(topic => topic.slug === slug);
    if (!topic) notFound();
    return pageMetadata(topic.title, topic.description, `/blog/topics/${topic.slug}`);
}
export default async function Topic({ params }: Props) {
    const { slug } = await params;
    const topic = topics.find(topic => topic.slug === slug);
    if (!topic) notFound();
    return <div className="page-wrapper writing-page"><header className="topic-header"><Link className="text-link" href="/blog">← All writing</Link><h1>{topic.title}</h1><p>{topic.description}</p></header><BlogList posts={getSortedPostsData().filter(post => topic.posts.includes(post.id))} /></div>;
}
