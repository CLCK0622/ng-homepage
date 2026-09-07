import 'server-only';
import { GALLERY_PAGE_SIZE, type PhotoData, type PhotoDetails, type UnsplashStats } from './gallery';

async function unsplash<T>(path: string, revalidate = 3600): Promise<T> {
    const key = process.env.UNSPLASH_ACCESS_KEY;
    if (!key) throw new Error('Photography service is unavailable');
    const response = await fetch(`https://api.unsplash.com/${path}`, {
        headers: { Authorization: `Client-ID ${key}` }, next: { revalidate }, signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) throw new Error(`Photography service returned ${response.status}`);
    return response.json();
}

export async function getPhotos(page = 1, perPage = GALLERY_PAGE_SIZE): Promise<PhotoData[]> {
    const photos = await unsplash<PhotoData[]>(`users/clck0622/photos?page=${page}&per_page=${perPage}&order_by=latest`);
    if (!Array.isArray(photos)) throw new Error('Invalid photography response');
    return photos.map(({ id, width, height, alt_description, description, urls, links }) => ({ id, width, height, alt_description, description, urls, links }));
}

export function getPhotoDetails(id: string) {
    return unsplash<PhotoDetails>(`photos/${encodeURIComponent(id)}`, 86400).then(({ exif, location, views, downloads, created_at }) => ({ exif, location, views, downloads, created_at }));
}

export function getPhotoStats() { return unsplash<UnsplashStats>('users/clck0622/statistics'); }

export const galleryCacheHeaders = { 'Cache-Control': 'public, max-age=300, s-maxage=3600, stale-while-revalidate=86400' };
