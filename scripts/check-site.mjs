import assert from 'node:assert/strict';

// Run against `next start` to exercise real status codes and generated metadata.
const base = process.env.SITE_CHECK_URL || 'http://127.0.0.1:3001';
const canonicalOrigin = 'https://www.clckkkkk.site';
const request = path => fetch(new URL(path, base), { signal: AbortSignal.timeout(30000) });
const attribute = (tag, name) => tag.match(new RegExp(`\\b${name}="([^"]*)"`, 'i'))?.[1];
function metadata(html, key) {
    return [...html.matchAll(/<meta\s[^>]*>/gi)].map(match => match[0])
        .find(tag => attribute(tag, 'name') === key || attribute(tag, 'property') === key);
}

const sitemapResponse = await request('/sitemap.xml');
assert.equal(sitemapResponse.status, 200);
const sitemap = await sitemapResponse.text();
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => match[1]);
assert.ok(urls.length >= 36, 'Existing pages must stay discoverable');
assert.equal(new Set(urls).size, urls.length, 'Sitemap must not repeat URLs');
const titles = new Set();
for (const url of urls) {
    const path = new URL(url).pathname;
    const response = await request(path);
    assert.equal(response.status, 200, `${path} status`);
    const html = await response.text();
    const canonical = [...html.matchAll(/<link\s[^>]*>/gi)].map(match => match[0]).filter(tag => attribute(tag, 'rel') === 'canonical');
    assert.equal(canonical.length, 1, `${path} must have one canonical`);
    assert.equal(new URL(attribute(canonical[0], 'href')).href, new URL(path, canonicalOrigin).href, `${path} canonical must point to itself`);
    const title = html.match(/<title>(.*?)<\/title>/s)?.[1];
    assert.ok(title && !titles.has(title), `${path} needs a unique title`);
    titles.add(title);
    assert.ok(attribute(metadata(html, 'description') || '', 'content'), `${path} needs a description`);
    assert.ok(attribute(metadata(html, 'og:image') || '', 'content'), `${path} needs a social image`);
    assert.equal(new URL(attribute(metadata(html, 'og:url') || '', 'content')).href, new URL(path, canonicalOrigin).href, `${path} sharing URL`);
    assert.ok(!attribute(metadata(html, 'robots') || '', 'content')?.includes('noindex'), `${path} should be indexable`);
    assert.equal([...html.matchAll(/<h1(?:\s|>)/g)].length, 1, `${path} should have one page heading`);
    assert.ok(!html.includes('counterapi.dev'), 'Visitor counter must stay removed');
    for (const [, json] of html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)) JSON.parse(json);
}
console.log(`PASS ${urls.length} sitemap pages: status, canonical, title, description, sharing, heading and JSON-LD`);

for (const path of ['/blog/site-check-missing', '/portfolio/site-check-missing', '/blog/topics/site-check-missing', '/site-check-missing']) {
    const response = await request(path);
    assert.equal(response.status, 404, `${path} must return a real 404`);
    assert.match(await response.text(), /noindex/, `${path} must not be indexed`);
}
console.log('PASS unknown article, project, topic and general URLs return 404 + noindex');

const robots = await (await request('/robots.txt')).text();
assert.ok(robots.includes(`Sitemap: ${canonicalOrigin}/sitemap.xml`));
const feed = await request('/rss.xml');
assert.equal(feed.status, 200);
assert.match(await feed.text(), /<rss\s/);
const image = await request('/og');
assert.equal(image.status, 200);
assert.match(image.headers.get('content-type'), /image\/png/);
const imageBytes = new Uint8Array(await image.arrayBuffer());
assert.deepEqual([...imageBytes.slice(0, 8)], [137, 80, 78, 71, 13, 10, 26, 10]);
console.log('PASS robots, RSS and PNG sharing image');

for (const path of ['/api/unsplash/photos?page=-1', '/api/unsplash/photos?per_page=999', '/api/unsplash/photos?page=1.2', '/api/unsplash?id=../private']) {
    const response = await request(path);
    assert.equal(response.status, 400, `${path} invalid parameters`);
    assert.equal(response.headers.get('cache-control'), 'no-store');
}
const photosResponse = await request('/api/unsplash/photos?page=1&per_page=30');
if (photosResponse.ok) {
    assert.match(photosResponse.headers.get('cache-control'), /max-age=300/);
    const photos = await photosResponse.json();
    assert.ok(Array.isArray(photos));
    assert.equal(new Set(photos.map(photo => photo.id)).size, photos.length);
    if (photos.length) {
        const details = await request(`/api/unsplash?id=${photos[0].id}`);
        if (details.ok) assert.match(details.headers.get('cache-control'), /max-age=300/);
        else { assert.equal(details.status, 503); assert.equal(details.headers.get('cache-control'), 'no-store'); }
    }
    console.log(`PASS gallery pagination and detail cache headers (${photos.length} photographs)`);
} else {
    assert.equal(photosResponse.status, 503);
    assert.equal(photosResponse.headers.get('cache-control'), 'no-store');
    console.log('PASS gallery upstream failure is retryable and not cached (live upstream unavailable)');
}
console.log('PASS gallery input validation');
