import Link from 'next/link';

export default function Footer() {
    return <footer className="footer">
        <div>© {new Date().getFullYear()} Kevin Zhong.</div>
        <div className="footer-links"><Link href="/about">About</Link><a href="/rss.xml">RSS</a><a href="mailto:yiz29@illinois.edu">Say hello ↗</a></div>
    </footer>;
}
