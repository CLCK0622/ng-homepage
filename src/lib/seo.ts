import type { Metadata } from 'next';
import { SITE_URL, SITE_TITLE } from './constants';

export const DEFAULT_SOCIAL_IMAGE = `${SITE_URL}/og`;

export function pageMetadata(title: string, description: string, path: string, image = DEFAULT_SOCIAL_IMAGE): Metadata {
    return {
        title, description,
        alternates: { canonical: path, types: { 'application/rss+xml': '/rss.xml' } },
        openGraph: {
            title: `${title} | Kevin Zhong`, description, url: path,
            siteName: SITE_TITLE, type: 'website', locale: 'en_US',
            images: [{ url: image, alt: title }],
        },
        twitter: { card: 'summary_large_image', title: `${title} | Kevin Zhong`, description, images: [image], creator: '@CLCKKKKK' },
    };
}

export const person = {
    '@type': 'Person', '@id': `${SITE_URL}/about#person`, name: 'Kevin Zhong',
    alternateName: ['CLCK', 'Kevin Y. Zhong'], url: `${SITE_URL}/about`, image: `${SITE_URL}/photo-bg.png`,
    sameAs: ['https://github.com/CLCK0622', 'https://www.linkedin.com/in/clckkkkk/', 'https://unsplash.com/@clck0622'],
};
