import { NextRequest, NextResponse } from 'next/server';
import { getPhotos, galleryCacheHeaders } from '@/lib/unsplash';
import { GALLERY_PAGE_SIZE } from '@/lib/gallery';

export async function GET(req: NextRequest) {
    const page = Number(req.nextUrl.searchParams.get('page') ?? 1);
    const perPage = Number(req.nextUrl.searchParams.get('per_page') ?? GALLERY_PAGE_SIZE);
    if (!Number.isInteger(page) || page < 1 || page > 1000 || !Number.isInteger(perPage) || perPage < 1 || perPage > 30) {
        return NextResponse.json({ error: 'Invalid page or page size' }, { status: 400, headers: { 'Cache-Control': 'no-store' } });
    }
    try {
        return NextResponse.json(await getPhotos(page, perPage), { headers: galleryCacheHeaders });
    } catch {
        return NextResponse.json({ error: 'Photos could not be loaded. Please try again.' }, { status: 503, headers: { 'Cache-Control': 'no-store' } });
    }
}
