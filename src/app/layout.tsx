import type { Metadata } from 'next';
import { Noto_Sans_SC } from 'next/font/google';
import localFont from 'next/font/local';
import { pageMetadata } from '@/lib/seo';
import '../styles/main.scss';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { SITE_URL, SITE_DESCRIPTION } from '@/lib/constants';
import { SpeedInsights } from "@vercel/speed-insights/next"

const handwriting = localFont({ src: '../../public/fonts/Caveat.ttf', variable: '--font-handwriting', display: 'swap', weight: '600', preload: false });

const notoSansSC = Noto_Sans_SC({ subsets: ['latin'], variable: '--font-cn', weight: ['400', '500', '700'] });

export const metadata: Metadata = {
    ...pageMetadata('Kevin Zhong (CLCK) — Founder, Developer & Photographer', SITE_DESCRIPTION, '/'),
    title: { template: '%s | Kevin Zhong (CLCK)', default: 'Kevin Zhong (CLCK) — Founder, Developer & Photographer' },
    metadataBase: new URL(SITE_URL),
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={`${notoSansSC.variable} ${handwriting.variable}`}>
        <head>
            <script defer src="https://cloud.umami.is/script.js" data-website-id="1b934541-1dd5-4860-afce-1d5e0a6c9ad0"></script>
            {/* App Router root layout: this font is shared by every page. */}
            {/* eslint-disable-next-line @next/next/no-page-custom-font */}
            <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/css2?family=Google+Sans+Flex:wght@400;500;600;700&display=swap"
            />

        </head>
        <body>
        <a href="#main-content" className="skip-link">Skip to content</a>
        <div className="app-container">
            <Navbar />
            <main id="main-content" className="main-content">
                {children}
            </main>
            <Footer />
        </div>
        <SpeedInsights/>
        </body>
        </html>
    );
}