'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BsArrowRight, BsSearch } from 'react-icons/bs';
import type { PostData } from '@/lib/posts';

export default function BlogList({ posts, filterable = false }: { posts: PostData[]; filterable?: boolean }) {
    const [category, setCategory] = useState('All');
    const [query, setQuery] = useState('');
    const categories = ['All', ...new Set(posts.flatMap(post => post.tags))];
    const search = query.trim().toLowerCase();
    const visible = posts.filter(post => (category === 'All' || post.tags.includes(category))
        && `${post.title} ${post.description} ${post.tags.join(' ')}`.toLowerCase().includes(search));
    return <>
        {filterable && <div className="writing-controls">
            <div className="writing-filters" role="group" aria-label="Filter writing by tag">{categories.map(tag => <button key={tag} type="button" aria-pressed={category === tag} onClick={() => setCategory(tag)}>{tag}</button>)}</div>
            <label className="writing-search">
                <BsSearch aria-hidden="true" />
                <span className="sr-only">Search articles</span>
                <input type="search" placeholder="Search articles…" value={query} onChange={event => setQuery(event.target.value)} />
            </label>
        </div>}
        <div className="blog-list">
            {visible.map(post => <Link href={`/blog/${post.id}`} key={post.id} className="blog-item">
                {post.image && <div className="post-thumbnail"><Image src={post.image} alt="" width={120} height={80} sizes="120px" style={{ objectFit: 'cover' }} /></div>}
                <div className="left"><time className="date" dateTime={post.date}>{post.date}</time><h2>{post.title}</h2><p className="excerpt">{post.description}</p></div>
                <div className="right"><div className="tags">{post.tags.map(tag => <span key={tag}>#{tag}</span>)}</div><BsArrowRight size={20} color="#ccc" aria-hidden="true" /></div>
            </Link>)}
        </div>
        {visible.length === 0 && <p className="writing-empty" role="status">No articles found. Try another search or tag.</p>}
    </>;
}
