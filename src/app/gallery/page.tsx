import Link from 'next/link';
import { FaUnsplash } from 'react-icons/fa6';
import GalleryGrid from '@/app/components/GalleryGrid';
import PageHeader from '@/app/components/PageHeader';
import { pageMetadata } from '@/lib/seo';
import { getPhotos, getPhotoStats } from '@/lib/unsplash';

export const metadata = pageMetadata('Photography', 'Street photography and everyday observations by Kevin Zhong. Explore a growing collection of photographs, places, and visual stories.', '/gallery');
export const revalidate = 3600;

export default async function Gallery() {
    const [photosResult, statsResult] = await Promise.allSettled([getPhotos(), getPhotoStats()]);
    const photos = photosResult.status === 'fulfilled' ? photosResult.value : [];
    const stats = statsResult.status === 'fulfilled' ? statsResult.value : null;
    return <div className="page-wrapper gallery-page">
        <PageHeader title="Gallery" eyebrow="Through my lens" description="A pause for the places, people, and little things along the way." />
        <div className="gallery-stats" aria-label="Photography on Unsplash">
            {stats && <>
                <div><strong>{stats.views.total.toLocaleString()}</strong><span>views</span></div>
                <div><strong>{stats.downloads.total.toLocaleString()}</strong><span>downloads</span></div>
            </>}
            <Link className="gallery-more-link" href="https://unsplash.com/@clck0622" target="_blank" rel="noopener noreferrer"><FaUnsplash aria-hidden="true" /> More on Unsplash ↗</Link>
        </div>
        <GalleryGrid initialPhotos={photos} initialError={photosResult.status === 'rejected'} />
    </div>;
}
