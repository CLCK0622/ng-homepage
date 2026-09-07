import { getPostData, getSortedPostsData } from '@/lib/posts';
import {BsArrowLeft, BsCcCircle} from 'react-icons/bs';
import Link from 'next/link';
import Image from "next/image";
import Comments from "@/app/components/Comments";
import Snow from '@/app/components/Snow';
import {Metadata} from "next";
import { notFound } from 'next/navigation';
import { DEFAULT_SOCIAL_IMAGE, pageMetadata, person } from '@/lib/seo';
import { SITE_URL } from '@/lib/constants';
import { getRelatedPosts } from '@/lib/topics';
import StructuredData from '@/app/components/StructuredData';

export async function generateStaticParams() {
    const posts = getSortedPostsData();
    return posts.map((post) => ({
        id: post.id,
    }));
}

export const dynamicParams = false;

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const post = await getPostData((await params).id);
    if (!post) notFound();
    const metadata = pageMetadata(post.title, post.description, `/blog/${post.id}`, post.image || DEFAULT_SOCIAL_IMAGE);
    return {
        ...metadata,
        openGraph: { ...metadata.openGraph, type: 'article', locale: post.lang === 'zh-CN' ? 'zh_CN' : 'en_US', publishedTime: post.date, modifiedTime: post.updated, authors: [`${SITE_URL}/about`] },
    };
}

export default async function Post({ params }: Props) {
    const post = await getPostData((await params).id);
    if (!post) notFound();
    const related = getRelatedPosts(post, getSortedPostsData());
    return (
            <div className="article-container" lang={post.lang}>
                <StructuredData data={{ '@context': 'https://schema.org', '@type': 'BlogPosting', headline: post.title, description: post.description,
                    datePublished: post.date, dateModified: post.updated, inLanguage: post.lang, author: person,
                    image: post.image || DEFAULT_SOCIAL_IMAGE, mainEntityOfPage: `${SITE_URL}/blog/${post.id}`, url: `${SITE_URL}/blog/${post.id}` }} />
                {post.snow && <Snow />}

                <div className="reading-progress-bar"></div>

                <div className="back-link">
                    <Link href="/blog" style={{display:'inline-flex', alignItems:'center', gap:'8px'}}>
                        <BsArrowLeft /> <span>Back to writing</span>
                    </Link>
                </div>

                <header className="article-header">
                    <div className="meta">
                        <time className="date" dateTime={post.date}>{post.date}</time>
                        <div className="tags">
                            {post.tags?.map((t: string) => <span key={t}>#{t}</span>)}
                        </div>
                    </div>

                    <h1>{post.title}</h1>
                    {post.description && (
                        <p className="post-description">{post.description}</p>
                    )}

                    {post.image && (
                        <div className="post-cover">
                            <Image
                                src={post.image}
                                alt={post.title}
                                fill
                                priority
                                sizes="(max-width: 1200px) 100vw, 1200px"
                                className="featured-image"
                            />
                        </div>
                    )}
                </header>

                <article
                    className="markdown-body"
                    dangerouslySetInnerHTML={{ __html: post.contentHtml || '' }}
                />

                <div className="license-block">
                    <div className="license-icon">
                        <BsCcCircle size={24} />
                    </div>
                    <div className="license-content">
                        <p>
                            <strong>CC BY-SA 4.0</strong>
                        </p>
                        <p>
                            This article is licensed under <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noopener noreferrer">CC BY-SA 4.0</a>.
                            You are free to share and adapt this work, provided you attribute <strong>Kevin Zhong</strong> and distribute under the same license.
                        </p>
                    </div>
                </div>

                {related.length > 0 && <section className="related-posts" aria-labelledby="related-title">
                    <h2 id="related-title">Keep exploring</h2>
                    <div>{related.map(item => <Link key={item.id} href={`/blog/${item.id}`}><span>{item.tags.join(' / ')}</span><h3>{item.title}</h3><p>{item.description}</p></Link>)}</div>
                </section>}

                <div className="comments-section">
                    <Comments />
                </div>
            </div>
        );
}
