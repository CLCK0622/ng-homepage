'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaHome, FaPenNib, FaUser, FaThLarge, FaCamera } from 'react-icons/fa';

export default function Navbar() {
    const pathname = usePathname();
    const links = [
        { href: '/', label: 'Home', icon: <FaHome /> },
        { href: '/portfolio', label: 'Portfolio', icon: <FaThLarge /> },
        { href: '/gallery', label: 'Gallery', icon: <FaCamera /> },
        { href: '/blog', label: 'Blog', icon: <FaPenNib /> },
        { href: '/about', label: 'About', icon: <FaUser /> },
    ];

    const isActive = (path: string) => {
        if (!pathname) return false;

        if (path === '/') {
            return pathname === '/';
        }
        return pathname.startsWith(path);
    };

    return (
        <>
            <nav className="navbar" aria-label="Main navigation">
                <Link href="/" className="logo">
                    <span className="at">@</span>
                    <span className="id">CLCK</span>
                </Link>

                {/* Desktop Navigation */}
                <div className="nav-center">
                    {links.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={isActive(link.href) ? 'active' : ''}
                            aria-current={isActive(link.href) ? 'page' : undefined}
                            aria-label={link.label}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>

                <div className="nav-action">
                    <a className="contact-link" href="mailto:yiz29@illinois.edu">Get in touch</a>
                </div>
            </nav>

            {/* Mobile Bottom Navigation */}
            <nav className="mobile-nav" aria-label="Mobile navigation">
                {links.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className={isActive(link.href) ? 'active' : ''}
                            aria-current={isActive(link.href) ? 'page' : undefined}
                            aria-label={link.label}
                    >
                        {link.icon}<span className="mobile-nav-label">{link.label}</span>
                    </Link>
                ))}
            </nav>
        </>
    );
}