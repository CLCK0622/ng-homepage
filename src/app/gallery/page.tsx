import Link from "next/link";
import {Metadata} from "next";
import GalleryGrid from "@/app/components/GalleryGrid";
import type {PhotoData} from "@/app/components/GalleryLightbox";
import {FaUnsplash} from "react-icons/fa6";

export const metadata: Metadata = {
    title: 'Gallery',
    description: 'Street photography and visual stories.',
};

interface UnsplashStats {
    views: { total: number; historical: { change: number } };
    downloads: { total: number; historical: { change: number } };
}

async function fetchWithKey(url: string) {
    const key = process.env.UNSPLASH_ACCESS_KEY;
    if (!key) return null;
    const res = await fetch(url, {
        headers: { Authorization: `Client-ID ${key}` },
        next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    return res.json();
}

export default async function Gallery() {
    const [allPhotos, stats] = await Promise.all([
        fetchWithKey('https://api.unsplash.com/users/clck0622/photos?per_page=30&order_by=latest'),
        fetchWithKey('https://api.unsplash.com/users/clck0622/statistics') as Promise<UnsplashStats | null>,
    ]);

    const photos: PhotoData[] = (allPhotos || []).map((p: any) => ({
        id: p.id,
        width: p.width,
        height: p.height,
        alt_description: p.alt_description,
        description: p.description,
        urls: p.urls,
        links: p.links,
    }));

    return (
        <div className="page-wrapper gallery-page">
            <div className="page-header">
                <h1>Gallery</h1>
                <p>Street photography and visual stories.</p>
            </div>

            <div className="gallery-unsplash-link">
                <Link href="https://unsplash.com/@clck0622" target="_blank">
                    <FaUnsplash /> View all on Unsplash
                </Link>
            </div>

            {stats && (
                <div className="gallery-stats">
                    <div className="stat-card">
                        <div className="stat-header">
                            <span className="stat-label">Views</span>
                            <span className="stat-period">Last 30 days</span>
                        </div>
                        <span className="stat-value">{stats.views.historical.change.toLocaleString()}</span>
                        <span className="stat-badge">Top 10% of contributors</span>
                        <span className="stat-alltime">All time: {stats.views.total.toLocaleString()}</span>
                    </div>
                    <div className="stat-card">
                        <div className="stat-header">
                            <span className="stat-label">Downloads</span>
                            <span className="stat-period">Last 30 days</span>
                        </div>
                        <span className="stat-value">{stats.downloads.historical.change.toLocaleString()}</span>
                        <span className="stat-badge">Top 10% of contributors</span>
                        <span className="stat-alltime">All time: {stats.downloads.total.toLocaleString()}</span>
                    </div>
                </div>
            )}

            {photos.length === 0 ? (
                <p style={{textAlign: 'center', color: '#999', marginTop: '2rem'}}>
                    Failed to load photos.
                </p>
            ) : (
                <GalleryGrid initialPhotos={photos} />
            )}
        </div>
    );
}
