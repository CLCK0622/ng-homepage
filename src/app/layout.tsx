import type { Metadata } from 'next';
import { Inter, Noto_Sans_SC } from 'next/font/google';
import '../styles/main.scss';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { SITE_URL, SITE_DESCRIPTION, SITE_TITLE } from '@/lib/constants';
import { SpeedInsights } from "@vercel/speed-insights/next"

const inter = Inter({ subsets: ['latin'], variable: '--font-main' });
const notoSansSC = Noto_Sans_SC({ subsets: ['latin'], variable: '--font-cn', weight: ['400', '500', '700'] });

export const metadata: Metadata = {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    metadataBase: new URL(SITE_URL),
    alternates: {
        types: {
            'application/rss+xml': [
                { url: '/rss.xml', title: 'RSS Feed' },
            ],
        },
    },
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={`${inter.variable} ${notoSansSC.variable}`}>
        <head>
            <link
                rel="stylesheet"
                href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css"
                integrity="sha384-n8MVd4RsNIU0tAv4ct0nTaAbDJwPJzDEaqSD1odI+WdtXRGWt2kTvGFasHpSy3SV"
                crossOrigin="anonymous"
            />
        </head>
        <body>
        <div className="app-container">
            <Navbar />
            <main className="main-content">
                {children}
            </main>
            <Footer />
        </div>
        </body>
        <SpeedInsights/>
        </html>
    );
}