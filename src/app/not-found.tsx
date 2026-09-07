import Link from 'next/link';

export default function NotFound() {
    return <div className="not-found-page">
        <p className="page-eyebrow">A little detour</p>
        <h1>This page has wandered off.</h1>
        <p>The link may be old, or the page may have moved. There is still plenty to explore.</p>
        <div><Link className="pill-link" href="/">Back home</Link><Link className="text-link" href="/blog">Browse the writing →</Link></div>
    </div>;
}
