'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { IoClose } from 'react-icons/io5';
import { FiExternalLink } from 'react-icons/fi';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import unsplashLoader from '@/lib/unsplashLoader';
import type { PhotoData, PhotoDetails } from '@/lib/gallery';

const detailsCache = new Map<string, { data: PhotoDetails; expires: number }>();
const pendingDetails = new Map<string, Promise<PhotoDetails>>();
function photoDetails(id: string): Promise<PhotoDetails> {
    const cached = detailsCache.get(id);
    if (cached && cached.expires > Date.now()) return Promise.resolve(cached.data);
    const pending = pendingDetails.get(id);
    if (pending) return pending;
    const request = fetch(`/api/unsplash?id=${encodeURIComponent(id)}`, { signal: AbortSignal.timeout(12000) }).then(async response => {
        if (!response.ok) throw new Error('Details unavailable');
        const data: PhotoDetails = await response.json();
        if (detailsCache.size >= 100) detailsCache.delete(detailsCache.keys().next().value!);
        detailsCache.set(id, { data, expires: Date.now() + 300000 });
        return data;
    }).finally(() => pendingDetails.delete(id));
    pendingDetails.set(id, request);
    return request;
}

export default function GalleryLightbox({ photos, initialIndex, onClose }: { photos: PhotoData[]; initialIndex: number; onClose: () => void }) {
    const [index, setIndex] = useState(initialIndex);
    const [details, setDetails] = useState<{ id: string; data: PhotoDetails | null } | null>(null);
    const [imageState, setImageState] = useState<{ id: string; failed: boolean } | null>(null);
    const thumbsRef = useRef<HTMLDivElement>(null);
    const dialogRef = useRef<HTMLDivElement>(null);
    const current = photos[index];
    const exif = details?.id === current.id ? details.data : null;
    const loadingDetails = details?.id !== current.id;
    const imageReady = imageState?.id === current.id;
    const imageFailed = imageReady && imageState.failed;
    const previous = () => setIndex(value => (value + photos.length - 1) % photos.length);
    const next = () => setIndex(value => (value + 1) % photos.length);

    useEffect(() => {
        const previousFocus = document.activeElement as HTMLElement | null;
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        dialogRef.current?.querySelector<HTMLButtonElement>('button')?.focus();
        const handler = (event: KeyboardEvent) => {
            if (event.key === 'Escape') onClose();
            if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
                event.preventDefault();
                const delta = event.key === 'ArrowLeft' ? -1 : 1;
                setIndex(value => (value + delta + photos.length) % photos.length);
            }
            if (event.key === 'Tab') {
                const elements = dialogRef.current?.querySelectorAll<HTMLElement>('button, a[href]');
                if (!elements?.length) return;
                const first = elements[0], last = elements[elements.length - 1];
                if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
                else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
            }
        };
        window.addEventListener('keydown', handler);
        return () => { window.removeEventListener('keydown', handler); document.body.style.overflow = previousOverflow; previousFocus?.focus(); };
    }, [photos.length, onClose]);

    useEffect(() => {
        let ignore = false;
        photoDetails(current.id).then(data => { if (!ignore) setDetails({ id: current.id, data }); }).catch(() => { if (!ignore) setDetails({ id: current.id, data: null }); });
        return () => { ignore = true; };
    }, [current.id]);

    useEffect(() => {
        const thumb = thumbsRef.current?.children[index] as HTMLElement | undefined;
        thumb?.scrollIntoView({ behavior: 'auto', block: 'nearest', inline: 'center' });
    }, [index]);

    const fields = [
        ['Camera', [exif?.exif?.make, exif?.exif?.model].filter(Boolean).join(' ')],
        ['Focal length', exif?.exif?.focal_length ? `${exif.exif.focal_length}mm` : null],
        ['Aperture', exif?.exif?.aperture ? `f/${exif.exif.aperture}` : null],
        ['Shutter speed', exif?.exif?.exposure_time ? `${exif.exif.exposure_time}s` : null],
        ['ISO', exif?.exif?.iso], ['Location', exif?.location?.name],
        ['Date', exif?.created_at ? new Date(exif.created_at).toLocaleDateString() : null],
    ];

    return <div className="lightbox-overlay" role="dialog" aria-modal="true" aria-label="Photograph viewer" ref={dialogRef} onClick={onClose}>
        <button type="button" className="lightbox-close" onClick={onClose} aria-label="Close photograph"><IoClose size={24} /></button>
        <a href={current.links.html} target="_blank" rel="noopener noreferrer" className="lightbox-unsplash" onClick={event => event.stopPropagation()}>View on Unsplash <FiExternalLink size={14} /></a>
        <div className="lightbox-content" onClick={event => event.stopPropagation()}>
            <div className="lightbox-body">
                <div className="lightbox-main">
                    <button type="button" className="lightbox-nav lightbox-nav-left" onClick={previous} aria-label="Previous photograph"><BsChevronLeft size={20} /></button>
                    <div className="lightbox-image-wrapper">
                        {!imageReady && <div className="lightbox-img-loading" role="status" aria-label="Loading photograph"><div className="lightbox-spinner" /></div>}
                        {imageFailed && <div className="lightbox-img-loading"><a href={current.links.html} target="_blank" rel="noopener noreferrer">Image unavailable. View on Unsplash ↗</a></div>}
                        <Image key={current.id} loader={unsplashLoader} src={current.urls.raw} alt={current.alt_description || current.description || 'Photograph by Kevin Zhong'} width={current.width} height={current.height} sizes="(max-width: 900px) 95vw, 75vw" quality={85} loading="eager"
                            onLoad={() => setImageState({ id: current.id, failed: false })} onError={() => setImageState({ id: current.id, failed: true })}
                            style={{ opacity: imageReady && !imageFailed ? 1 : 0, transition: 'opacity 0.3s' }} />
                    </div>
                    <button type="button" className="lightbox-nav lightbox-nav-right" onClick={next} aria-label="Next photograph"><BsChevronRight size={20} /></button>
                </div>
                <div className="lightbox-sidebar" aria-live="polite">
                    {loadingDetails ? <p className="lightbox-meta-placeholder">Loading details…</p> : exif ? <>
                        {fields.filter(([, value]) => value).map(([label, value]) => <div className="exif-group" key={label}><span className="exif-label">{label}</span><span className="exif-value">{value}</span></div>)}
                        <div className="exif-stats"><span>{exif.views?.toLocaleString()} views</span><span>{exif.downloads?.toLocaleString()} downloads</span></div>
                    </> : <p className="lightbox-meta-placeholder">Photo details are unavailable.</p>}
                </div>
            </div>
            <div className="lightbox-thumbs-wrapper"><div className="lightbox-thumbs" ref={thumbsRef}>
                {photos.map((photo, i) => <button type="button" key={photo.id} className={`lightbox-thumb ${i === index ? 'active' : ''}`} onClick={() => setIndex(i)} aria-label={`View photograph ${i + 1}`} aria-current={i === index ? 'true' : undefined}>
                    <Image loader={unsplashLoader} src={photo.urls.raw} alt="" width={80} height={54} quality={75} />
                </button>)}
            </div></div>
        </div>
    </div>;
}
