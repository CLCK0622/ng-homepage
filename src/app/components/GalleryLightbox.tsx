'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import unsplashLoader from '@/lib/unsplashLoader';
import { IoClose } from 'react-icons/io5';
import { FiExternalLink } from 'react-icons/fi';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';

export interface PhotoData {
    id: string;
    width: number;
    height: number;
    alt_description: string | null;
    description: string | null;
    urls: { regular: string; small: string; thumb: string; raw: string };
    links: { html: string };
}

interface ExifData {
    exif: {
        make: string | null;
        model: string | null;
        exposure_time: string | null;
        aperture: string | null;
        focal_length: string | null;
        iso: number | null;
    } | null;
    location: { name: string | null } | null;
    views: number;
    downloads: number;
    created_at: string;
}

interface Props {
    photos: PhotoData[];
    initialIndex: number;
    onClose: () => void;
}

export default function GalleryLightbox({ photos, initialIndex, onClose }: Props) {
    const [index, setIndex] = useState(initialIndex);
    const [exif, setExif] = useState<ExifData | null>(null);
    const [loadingExif, setLoadingExif] = useState(false);
    const [imgLoaded, setImgLoaded] = useState(false);
    const [atStart, setAtStart] = useState(true);
    const [atEnd, setAtEnd] = useState(false);
    const thumbsRef = useRef<HTMLDivElement>(null);

    const current = photos[index];

    const prev = useCallback(() => {
        setIndex(i => (i > 0 ? i - 1 : photos.length - 1));
        setImgLoaded(false);
    }, [photos.length]);

    const next = useCallback(() => {
        setIndex(i => (i < photos.length - 1 ? i + 1 : 0));
        setImgLoaded(false);
    }, [photos.length]);

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowLeft') prev();
            if (e.key === 'ArrowRight') next();
        };
        window.addEventListener('keydown', handler);
        document.body.style.overflow = 'hidden';
        return () => {
            window.removeEventListener('keydown', handler);
            document.body.style.overflow = '';
        };
    }, [onClose, prev, next]);

    useEffect(() => {
        setExif(null);
        setLoadingExif(true);
        fetch(`/api/unsplash?id=${current.id}`)
            .then(r => r.json())
            .then(setExif)
            .catch(() => setExif(null))
            .finally(() => setLoadingExif(false));
    }, [current.id]);

    useEffect(() => {
        const el = thumbsRef.current;
        if (!el) return;
        const activeThumb = el.children[index] as HTMLElement;
        if (activeThumb) {
            activeThumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }
    }, [index]);

    const updateScrollEdges = useCallback(() => {
        const el = thumbsRef.current;
        if (!el) return;
        setAtStart(el.scrollLeft <= 5);
        setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 5);
    }, []);

    useEffect(() => {
        const el = thumbsRef.current;
        if (!el) return;
        updateScrollEdges();
        el.addEventListener('scroll', updateScrollEdges, { passive: true });
        return () => el.removeEventListener('scroll', updateScrollEdges);
    }, [updateScrollEdges]);

    // Serve the full-size image straight from Unsplash's CDN via the custom
    // loader (which appends w/q/auto=format); no Vercel Image Optimization.
    const fullUrl = current.urls.raw;

    return (
        <div className="lightbox-overlay" onClick={onClose}>
            <button className="lightbox-close" onClick={onClose}><IoClose size={24} /></button>
            <a href={current.links.html} target="_blank" rel="noopener noreferrer" className="lightbox-unsplash" onClick={e => e.stopPropagation()}>
                View on Unsplash <FiExternalLink size={14} />
            </a>

            <div className="lightbox-content" onClick={e => e.stopPropagation()}>
                <div className="lightbox-body">
                    <div className="lightbox-main">
                        <button className="lightbox-nav lightbox-nav-left" onClick={prev}><BsChevronLeft size={20} /></button>
                        <div className="lightbox-image-wrapper">
                            {!imgLoaded && (
                                <div className="lightbox-img-loading">
                                    <div className="lightbox-spinner" />
                                </div>
                            )}
                            <Image
                                key={current.id}
                                loader={unsplashLoader}
                                src={fullUrl}
                                alt={current.alt_description || 'Photo'}
                                width={current.width}
                                height={current.height}
                                sizes="75vw"
                                quality={85}
                                priority
                                onLoad={() => setImgLoaded(true)}
                                style={{ opacity: imgLoaded ? 1 : 0, transition: 'opacity 0.3s' }}
                            />
                        </div>
                        <button className="lightbox-nav lightbox-nav-right" onClick={next}><BsChevronRight size={20} /></button>
                    </div>

                    <div className="lightbox-sidebar">
                        {loadingExif ? (
                            <p className="lightbox-meta-placeholder">Loading...</p>
                        ) : exif?.exif ? (
                            <>
                                {exif.exif.model && (
                                    <div className="exif-group">
                                        <span className="exif-label">Camera</span>
                                        <span className="exif-value">{[exif.exif.make, exif.exif.model].filter(Boolean).join(' ')}</span>
                                    </div>
                                )}
                                {exif.exif.focal_length && (
                                    <div className="exif-group">
                                        <span className="exif-label">Focal Length</span>
                                        <span className="exif-value">{exif.exif.focal_length}mm</span>
                                    </div>
                                )}
                                {exif.exif.aperture && (
                                    <div className="exif-group">
                                        <span className="exif-label">Aperture</span>
                                        <span className="exif-value">f/{exif.exif.aperture}</span>
                                    </div>
                                )}
                                {exif.exif.exposure_time && (
                                    <div className="exif-group">
                                        <span className="exif-label">Shutter Speed</span>
                                        <span className="exif-value">{exif.exif.exposure_time}s</span>
                                    </div>
                                )}
                                {exif.exif.iso && (
                                    <div className="exif-group">
                                        <span className="exif-label">ISO</span>
                                        <span className="exif-value">{exif.exif.iso}</span>
                                    </div>
                                )}
                                {exif.location?.name && (
                                    <div className="exif-group">
                                        <span className="exif-label">Location</span>
                                        <span className="exif-value">{exif.location.name}</span>
                                    </div>
                                )}
                                <div className="exif-group">
                                    <span className="exif-label">Date</span>
                                    <span className="exif-value">{new Date(exif.created_at).toLocaleDateString()}</span>
                                </div>
                                <div className="exif-stats">
                                    <span>{exif.views?.toLocaleString()} views</span>
                                    <span>{exif.downloads?.toLocaleString()} downloads</span>
                                </div>
                            </>
                        ) : (
                            <p className="lightbox-meta-placeholder">No EXIF data</p>
                        )}
                    </div>
                </div>

                <div className={`lightbox-thumbs-wrapper ${atStart ? 'at-start' : ''} ${atEnd ? 'at-end' : ''}`}>
                    <div className="lightbox-thumbs" ref={thumbsRef}>
                        {photos.map((p, i) => (
                            <button
                                key={p.id}
                                className={`lightbox-thumb ${i === index ? 'active' : ''}`}
                                onClick={() => { setIndex(i); setImgLoaded(false); }}
                            >
                                <Image loader={unsplashLoader} src={p.urls.thumb} alt="" width={80} height={54} />
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
