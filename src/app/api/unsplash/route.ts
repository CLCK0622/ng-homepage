import { NextRequest, NextResponse } from 'next/server';
import { getPhotoDetails, galleryCacheHeaders } from '@/lib/unsplash';

export async function GET(req: NextRequest) {
    const id = req.nextUrl.searchParams.get('id');
    if (!id || !/^[a-zA-Z0-9_-]{1,64}$/.test(id)) return NextResponse.json({ error: 'Invalid photo ID' }, { status: 400, headers: { 'Cache-Control': 'no-store' } });
    try {
        return NextResponse.json(await getPhotoDetails(id), { headers: galleryCacheHeaders });
    } catch {
        return NextResponse.json({ error: 'Photo details are unavailable' }, { status: 503, headers: { 'Cache-Control': 'no-store' } });
    }
}
