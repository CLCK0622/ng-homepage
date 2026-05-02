'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaHome, FaPenNib, FaUser, FaThLarge, FaCamera } from 'react-icons/fa';
import {useEffect, useState} from "react";

export default function Navbar() {
    const pathname = usePathname();
    const [currentPath, setCurrentPath] = useState('');

    useEffect(() => {
        if (pathname) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setCurrentPath(pathname);
        }
    }, [pathname]);

    const links = [
        { href: '/', label: 'Home', icon: <FaHome /> },
        { href: '/portfolio', label: 'Portfolio', icon: <FaThLarge /> },
        { href: '/gallery', label: 'Gallery', icon: <FaCamera /> },
        { href: '/blog', label: 'Blog', icon: <FaPenNib /> },
        { href: '/about', label: 'About', icon: <FaUser /> },
    ];

    const isActive = (path: string) => {
        if (!currentPath) return false;

        if (path === '/') {
            return currentPath === '/';
        }
        return currentPath.startsWith(path);
    };

    return (
        <>
            <nav className="navbar">
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
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>

                <div className="nav-action">
                    <button onClick={() => window.location.href = 'mailto:kevin.zhong@pivothire.tech'}>
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
                        className={isActive(link.href) ? 'active' : ''}
                    >
                        {link.icon}
                    </Link>
                ))}
            </div>
        </>
    );
}