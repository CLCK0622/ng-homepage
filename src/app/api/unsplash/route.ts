import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const id = req.nextUrl.searchParams.get('id');
    const key = process.env.UNSPLASH_ACCESS_KEY;
    if (!id || !key) return NextResponse.json(null, { status: 400 });

    const res = await fetch(`https://api.unsplash.com/photos/${id}`, {
        headers: { Authorization: `Client-ID ${key}` },
    });
    if (!res.ok) return NextResponse.json(null, { status: res.status });

    const data = await res.json();
    return NextResponse.json({
        exif: data.exif,
        location: data.location,
        views: data.views,
        downloads: data.downloads,
        created_at: data.created_at,
    });
}
