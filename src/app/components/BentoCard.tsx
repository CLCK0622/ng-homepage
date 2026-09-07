import { BsArrowUpRight } from 'react-icons/bs';
import Link from 'next/link';
import Image from 'next/image';

interface BentoProps {
    post: {
        id: string;
        tags: string[];
        date: string;
        title: string;
        image?: string;
    };
    variant?: 'tall' | 'standard';
    hasButton?: boolean;
}

export default function BentoCard({ post, variant = 'standard', hasButton = false }: BentoProps) {
    if (!post || !post.id) {
        return null;
    }

    return (
        <Link
            href={`/blog/${post.id}`}
            className={`bento-card ${variant} ${post.image ? 'has-image' : ''} ${hasButton ? 'has-btn' : ''}`}
        >
            {post.image && <Image src={post.image} alt="" fill sizes="(max-width: 768px) calc(100vw - 32px), (max-width: 1200px) 50vw, 320px" className="bento-image" />}
            <div className="content">
                <div className="header">
                    <span className="badge">{post.tags.join(" / ")}</span>
                    <time className="date" dateTime={post.date}>{post.date}</time>
                </div>

                <div className="footer-area">
                    <div className="text">
                        <h3>{post.title}</h3>
                    </div>

                    {hasButton && (
                        <div className="action-corner">
                            <div className="circle-btn">
                                <BsArrowUpRight size={22} />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Link>
    );
}
