import Link from 'next/link';
import { BsArrowRight } from 'react-icons/bs';
import { getSortedPostsData } from '@/lib/posts';
import {Metadata} from "next";

export const metadata: Metadata = {
    title: 'Writing',
    description: 'Thoughts on code, design, society, and the spaces in between.',
};

export default function Blog() {
    const allPosts = getSortedPostsData();

    return (
        <div className="page-wrapper">
            <div className="page-header">
                <h1>Writing</h1>
                <p>Thoughts on code, design, and the spaces in between.</p>
            </div>

            <div className="blog-list">
                {allPosts.map(post => (
                    <Link href={`/blog/${post.id}`} key={post.id} className="blog-item">
                        <div className="left">
                            <div className="date">{post.date}</div>
                            <h3>{post.title}</h3>
                            <p className="excerpt">{post.description}</p>
                        </div>
                        <div className="right">
                            <div className="tags">
                                {post.tags.map(t => <span key={t}>#{t}</span>)}
                            </div>
                            <BsArrowRight size={20} color="#ccc" />
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}