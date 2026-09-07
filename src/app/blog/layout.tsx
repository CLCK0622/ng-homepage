import type { ReactNode } from 'react';

export default function BlogLayout({ children }: { children: ReactNode }) {
    return <>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" crossOrigin="anonymous" />
        {/* Reading fonts intentionally load only in the shared blog layout. */}
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cascadia+Code:wght@400;600&family=Source+Serif+4:ital,wght@0,400;0,600;0,700;1,400&family=Noto+Serif+SC:wght@400;600;700&display=swap" />
        {children}
    </>;
}
