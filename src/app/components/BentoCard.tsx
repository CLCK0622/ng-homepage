'use client';

import { BsArrowUpRight } from 'react-icons/bs';
import Link from 'next/link';

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
            style={{ backgroundImage: post.image ? `url(${post.image})` : undefined }}
        >
            <div className="content">
                <div className="header">
                    <span className="badge">{post.tags}</span>
                    <span className="date">{post.date}</span>
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