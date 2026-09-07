'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import GalleryLightbox from './GalleryLightbox';
import unsplashLoader from '@/lib/unsplashLoader';
import { GALLERY_PAGE_SIZE, type PhotoData } from '@/lib/gallery';

function PhotoTile({ photo, index, onOpen }: { photo: PhotoData; index: number; onOpen: () => void }) {
    const [state, setState] = useState<'loading' | 'ready' | 'error'>('loading');
    return <button type="button" className={`gallery-item is-${state}`} onClick={onOpen} aria-label={`Open photograph: ${photo.alt_description || photo.description || `Photo ${index + 1}`}`}>
        {state === 'loading' && <span className="gallery-skeleton" aria-hidden="true" />}
        <Image loader={unsplashLoader} src={photo.urls.raw} alt={photo.alt_description || photo.description || 'Photograph by Kevin Zhong'}
            fill sizes="(max-width: 600px) calc((100vw - 44px) / 2), (max-width: 1024px) calc((100vw - 88px) / 3), 232px"
            quality={80} loading={index < 5 ? 'eager' : 'lazy'} onLoad={() => setState('ready')} onError={() => setState('error')} />
        {state === 'error' && <span className="gallery-image-error">Preview unavailable<br /><small>Open photograph ↗</small></span>}
    </button>;
}

export default function GalleryGrid({ initialPhotos, initialError = false }: { initialPhotos: PhotoData[]; initialError?: boolean }) {
    const [photos, setPhotos] = useState(initialPhotos);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(initialError || initialPhotos.length === GALLERY_PAGE_SIZE);
    const [error, setError] = useState(initialError ? 'The photographs could not be loaded.' : '');
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const closeLightbox = useCallback(() => setActiveIndex(null), []);
    const pageRef = useRef(initialError ? 1 : 2);
    const requestRef = useRef<AbortController | null>(null);
    const loaderRef = useRef<HTMLDivElement>(null);

    const loadMore = useCallback(async () => {
        // A synchronous lock also covers observer callbacks before React re-renders.
        if (requestRef.current || !hasMore) return;
        const controller = new AbortController();
        requestRef.current = controller;
        setLoading(true);
        setError('');
        try {
            const response = await fetch(`/api/unsplash/photos?page=${pageRef.current}&per_page=${GALLERY_PAGE_SIZE}`, { signal: controller.signal });
            if (!response.ok) throw new Error('Photos unavailable');
            const nextPhotos: PhotoData[] = await response.json();
            if (!Array.isArray(nextPhotos)) throw new Error('Invalid response');
            setPhotos(previous => {
                const ids = new Set(previous.map(photo => photo.id));
                return [...previous, ...nextPhotos.filter(photo => !ids.has(photo.id))];
            });
            pageRef.current += 1;
            setHasMore(nextPhotos.length === GALLERY_PAGE_SIZE);
        } catch {
            if (!controller.signal.aborted) setError('The next photographs could not be loaded. Please try again.');
        } finally {
            if (requestRef.current === controller) {
                requestRef.current = null;
                setLoading(false);
            }
        }
    }, [hasMore]);

    useEffect(() => () => { requestRef.current?.abort(); requestRef.current = null; }, []);
    useEffect(() => {
        if (!hasMore || loading || error) return;
        const observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) void loadMore();
        }, { rootMargin: '400px' });
        if (loaderRef.current) observer.observe(loaderRef.current);
        return () => observer.disconnect();
    }, [hasMore, loading, error, loadMore]);

    return <>
        <div className="gallery-grid" aria-label="Photo gallery">
            {photos.map((photo, index) => <PhotoTile key={photo.id} photo={photo} index={index} onOpen={() => setActiveIndex(index)} />)}
        </div>
        <div className="gallery-load-more" ref={loaderRef}>
            <p role="status">{error || (loading ? 'Finding a few more moments…' : photos.length === 0 && !hasMore ? 'New photographs are on their way.' : '')}</p>
            {hasMore && <button type="button" className="pill-link" disabled={loading} onClick={loadMore}>{loading ? 'Loading…' : error ? 'Try again' : 'More photographs ↓'}</button>}
        </div>
        {activeIndex !== null && <GalleryLightbox photos={photos} initialIndex={activeIndex} onClose={closeLightbox} />}
    </>;
}
