import type { ImageLoaderProps } from 'next/image';

/**
 * Custom next/image loader for Unsplash photos.
 *
 * Unsplash serves every image through its own imgix CDN, which already does
 * on-the-fly resize / format negotiation / global caching. Routing those URLs
 * through Vercel Image Optimization (`/_next/image`) is therefore redundant and
 * burns Vercel's image-optimization quota on every cache miss.
 *
 * By supplying this loader on the gallery <Image> components, next/image builds
 * its `src` / `srcset` straight from Unsplash's CDN (so we still get responsive
 * sizes, lazy loading and AVIF/WebP via `auto=format`) while bypassing Vercel
 * Image Optimization entirely. Net Vercel image-optimization usage for the
 * gallery → effectively zero.
 */
export default function unsplashLoader({ src, width, quality }: ImageLoaderProps): string {
    const url = new URL(src);
    url.searchParams.set('w', String(width));
    url.searchParams.set('q', String(quality ?? 75));
    // Let Unsplash's imgix pick the best modern format (AVIF/WebP) per browser.
    url.searchParams.set('auto', 'format');
    return url.toString();
}
