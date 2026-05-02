'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import GalleryLightbox, { type PhotoData } from './GalleryLightbox';

export default function GalleryGrid({ initialPhotos }: { initialPhotos: PhotoData[] }) {
    const [photos, setPhotos] = useState<PhotoData[]>(initialPhotos);
    const [page, setPage] = useState(2);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const loaderRef = useRef<HTMLDivElement>(null);

    const loadMore = useCallback(async () => {
        if (loading || !hasMore) return;
        setLoading(true);
        try {
            const res = await fetch(`/api/unsplash/photos?page=${page}&per_page=30`);
            const newPhotos: PhotoData[] = await res.json();
            if (!newPhotos || newPhotos.length === 0) {
                setHasMore(false);
            } else {
                setPhotos(prev => {
                    const existingIds = new Set(prev.map(p => p.id));
                    const unique = newPhotos.filter(p => !existingIds.has(p.id));
                    return [...prev, ...unique];
                });
                setPage(p => p + 1);
                if (newPhotos.length < 30) setHasMore(false);
            }
        } catch {
            setHasMore(false);
        }
        setLoading(false);
    }, [page, loading, hasMore]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => { if (entries[0].isIntersecting) loadMore(); },
            { rootMargin: '600px' }
        );
        if (loaderRef.current) observer.observe(loaderRef.current);
        return () => observer.disconnect();
    }, [loadMore]);

    return (
        <>
            <div className="gallery-grid">
                {photos.map((photo, i) => (
                    <button
                        key={photo.id}
                        className="gallery-item"
                        onClick={() => setActiveIndex(i)}
                    >
                        <Image
                            src={photo.urls.small}
                            alt={photo.alt_description || photo.description || 'Photo'}
                            width={photo.width}
                            height={photo.height}
                            sizes="(max-width: 768px) 33vw, 20vw"
                        />
                    </button>
                ))}

                {loading && Array.from({ length: 10 }).map((_, i) => (
                    <div key={`skeleton-${i}`} className="gallery-skeleton" />
                ))}
            </div>

            {hasMore && <div ref={loaderRef} style={{ height: 1 }} />}

            {activeIndex !== null && (
                <GalleryLightbox
                    photos={photos}
                    initialIndex={activeIndex}
                    onClose={() => setActiveIndex(null)}
                />
            )}
        </>
    );
}
