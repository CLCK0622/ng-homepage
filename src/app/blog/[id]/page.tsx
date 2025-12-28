import { getPostData, getSortedPostsData } from '@/lib/posts';
import {BsArrowLeft, BsCcCircle} from 'react-icons/bs';
import Link from 'next/link';
import Image from "next/image";
import Comments from "@/app/components/Comments";
import Snow from '@/app/components/Snow';
import {Metadata} from "next";

export async function generateStaticParams() {
    const posts = getSortedPostsData();
    return posts.map((post) => ({
        id: post.id,
    }));
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
    const id = decodeURIComponent(params.id);

    try {
        const post = await getPostData(id);

        return {
            title: post.title,
            description: post.description,
            openGraph: {
                title: post.title,
                description: post.description,
                type: 'article',
                publishedTime: post.date,
                authors: ['Kevin Zhong'],
                images: post.image ? [
                    {
                        url: post.image,
                        alt: post.title,
                    }
                ] : [],
            },
        };
    } catch (error) {
        return {
            title: 'Post Not Found',
            description: 'The requested article could not be found.',
        };
    }
}

export default async function Post({ params }: any) {
    const realParams = await params;
    const id = decodeURIComponent(realParams.id);

    try {
        const post = await getPostData(id);

        return (
            <div className="article-container">
                {post.snow && <Snow />}

                <div className="reading-progress-bar"></div>

                <div className="back-link">
                    <Link href="/blog" style={{display:'inline-flex', alignItems:'center', gap:'8px'}}>
                        <BsArrowLeft /> <span>Back to writing</span>
                    </Link>
                </div>

                <header className="article-header">
                    <div className="meta">
                        <span className="date">{post.date}</span>
                        <div className="tags">
                            {post.tags?.map((t: string) => <span key={t}>#{t}</span>)}
                        </div>
                    </div>

                    <h1>{post.title}</h1>
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

                <div className="comments-section">
                    <Comments />
                </div>
            </div>
        );
    } catch (error) {
        return (
            <div style={{textAlign: 'center', marginTop: '4rem'}}>
                <h1>404 - Post Not Found</h1>
                <p>Could not find post with ID: {id}</p>
                <Link href="/" style={{textDecoration: 'underline'}}>Go Home</Link>
            </div>
        );
    }
}