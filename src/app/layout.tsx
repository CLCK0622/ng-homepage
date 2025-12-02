import type { Metadata } from 'next';
import { Inter, Noto_Sans_SC } from 'next/font/google';
import '../styles/main.scss';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const inter = Inter({ subsets: ['latin'], variable: '--font-main' });
const notoSansSC = Noto_Sans_SC({ subsets: ['latin'], variable: '--font-cn', weight: ['400', '500', '700'] });

export const metadata: Metadata = {
    title: 'Kevin Zhong | Portfolio',
    description: 'Digital garden of Kevin Zhong.',
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={`${inter.variable} ${notoSansSC.variable}`}>
        <body>
        <div className="app-container">
            <Navbar />
            <main className="main-content">
                {children}
            </main>
            <Footer />
        </div>
        </body>
        </html>
    );
}