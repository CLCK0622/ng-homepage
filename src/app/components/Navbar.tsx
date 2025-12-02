'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaHome, FaPenNib, FaUser, FaThLarge } from 'react-icons/fa';

export default function Navbar() {
    const pathname = usePathname();

    const links = [
        { href: '/', label: 'Home', icon: <FaHome /> },
        { href: '/portfolio', label: 'Portfolio', icon: <FaThLarge /> },
        { href: '/blog', label: 'Blog', icon: <FaPenNib /> },
        { href: '/about', label: 'About', icon: <FaUser /> },
    ];

    return (
        <>
            <nav className="navbar">
                <Link href="/" className="logo">
                    <span className="at">@</span>
                    <span className="id">CLCKKKKK</span>
                </Link>

                {/* Desktop Navigation */}
                <div className="nav-center">
                    {links.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={pathname === link.href ? 'active' : ''}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>

                <div className="nav-action">
                    <button onClick={() => window.location.href = 'mailto:zhongyi070622@gmail.com'}>
                        Get in touch
                    </button>
                </div>
            </nav>

            {/* Mobile Bottom Navigation */}
            <div className="mobile-nav">
                {links.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className={pathname === link.href ? 'active' : ''}
                    >
                        {link.icon}
                    </Link>
                ))}
            </div>
        </>
    );
}