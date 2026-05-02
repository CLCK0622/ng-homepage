import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const page = req.nextUrl.searchParams.get('page') || '1';
    const perPage = req.nextUrl.searchParams.get('per_page') || '30';
    const key = process.env.UNSPLASH_ACCESS_KEY;
    if (!key) return NextResponse.json([], { status: 400 });

    const res = await fetch(
        `https://api.unsplash.com/users/clck0622/photos?page=${page}&per_page=${perPage}&order_by=latest`,
        { headers: { Authorization: `Client-ID ${key}` } }
    );
    if (!res.ok) return NextResponse.json([], { status: res.status });

    const photos = await res.json();
    const mapped = photos.map((p: any) => ({
        id: p.id,
        width: p.width,
        height: p.height,
        alt_description: p.alt_description,
        description: p.description,
        urls: p.urls,
        links: p.links,
    }));

    return NextResponse.json(mapped);
}
