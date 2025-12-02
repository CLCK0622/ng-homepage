import { getPostData, getSortedPostsData } from '@/lib/posts';
import { BsArrowLeft } from 'react-icons/bs';
import Link from 'next/link';
import Image from "next/image";

export async function generateStaticParams() {
    const posts = getSortedPostsData();
    return posts.map((post) => ({
        id: post.id,
    }));
}

export default async function Post({ params }: any) {
    const realParams = await params;
    const id = decodeURIComponent(realParams.id);

    try {
        const post = await getPostData(id);

        return (
            <div className="article-container">
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

                    {post.image && (
                        <div className="hero-img">
                            <Image src={post.image} alt={post.title} />
                        </div>
                    )}
                </header>

                <article
                    className="markdown-body"
                    dangerouslySetInnerHTML={{ __html: post.contentHtml || '' }}
                />
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