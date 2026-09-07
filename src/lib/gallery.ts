export const GALLERY_PAGE_SIZE = 30;

export interface PhotoData {
    id: string;
    width: number;
    height: number;
    alt_description: string | null;
    description: string | null;
    urls: { regular: string; small: string; thumb: string; raw: string };
    links: { html: string };
}

export interface PhotoDetails {
    exif: { make: string | null; model: string | null; exposure_time: string | null; aperture: string | null; focal_length: string | null; iso: number | null } | null;
    location: { name: string | null } | null;
    views: number;
    downloads: number;
    created_at: string;
}

export interface UnsplashStats {
    views: { total: number; historical: { change: number } };
    downloads: { total: number; historical: { change: number } };
}
