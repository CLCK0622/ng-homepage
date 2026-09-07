import BentoCard from './components/BentoCard';
import Link from 'next/link';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { getSortedPostsData } from '@/lib/posts';
import Image from "next/image";
import { pageMetadata, person } from '@/lib/seo';
import { SITE_DESCRIPTION, SITE_URL } from '@/lib/constants';
import StructuredData from './components/StructuredData';
import {FaUnsplash} from "react-icons/fa6";

export const metadata = { ...pageMetadata('Kevin Zhong (CLCK) — Founder, Developer & Photographer', SITE_DESCRIPTION, '/'), title: { absolute: 'Kevin Zhong (CLCK) — Founder, Developer & Photographer' } };

interface UnsplashImage {
    urls: {
        regular: string;
        full: string;
    };
    user: {
        name: string;
    };
    alt_description: string;
}

async function getRandomHeroImage() {
    const accessKey = process.env.UNSPLASH_ACCESS_KEY;
    const collectionId = process.env.UNSPLASH_COLLECTION_ID;

    const fallbackImage = "https://images.unsplash.com/photo-1485230405346-71acb9518d9c?q=80&w=2694&auto=format&fit=crop";

    if (!accessKey || !collectionId) {
        console.warn("Unsplash credentials missing in .env.local");
        return fallbackImage;
    }

    try {
        const res = await fetch(
            `https://api.unsplash.com/photos/random?client_id=${accessKey}&collections=${collectionId}&orientation=landscape&count=1`,
            {
                next: { revalidate: 3600 },
                signal: AbortSignal.timeout(8000)
                // cache: 'no-store'
            }
        );

        if (!res.ok) {
            console.error(`Unsplash API Error: ${res.status} ${res.statusText}`);
            return fallbackImage;
        }

        const data = (await res.json()) as UnsplashImage[];

        return data[0]?.urls?.regular || fallbackImage;

    } catch (error) {
        console.error("Failed to fetch image from Unsplash:", error);
        return fallbackImage;
    }
}

export default async function Home() {
    const allPosts = getSortedPostsData();
    const latestPosts = allPosts.slice(0, 3);
    const defaultImage = "https://images.unsplash.com/photo-1623039405147-547794f92e9e?q=80&w=1426&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

    const heroImage = await getRandomHeroImage();
    return (
        <div className="bento-grid">
            <StructuredData data={{ '@context': 'https://schema.org', '@type': 'WebSite', name: "CLCK's Site", url: SITE_URL, author: person }} />
            <div className="col-left">
                {latestPosts[1] ? (
                    <BentoCard
                        post={{ ...latestPosts[1], image: latestPosts[1].image || defaultImage }}
                        variant="tall"
                        hasButton={true}
                    />
                ) : (
                    <div className="bento-card tall" style={{background: '#f0f0f0', display:'flex', alignItems:'center', justifyContent:'center'}}>
                        <span style={{color:'#999'}}>Waiting for posts...</span>
                    </div>
                )}

                {latestPosts[2] && (
                    <BentoCard post={{ ...latestPosts[2], image: latestPosts[2].image || defaultImage }}
                               hasButton={true}/>
                )}
            </div>

            <div className="col-center">
                <div className="hero-container">
                    <Image src={heroImage} alt="A moment from my photography collection" fill preload sizes="(max-width: 768px) calc(100vw - 32px), (max-width: 1200px) 50vw, 640px" />
                    <div className="hero-overlay">
                        <p>We are made of star-stuff, now gazing back at the stars.</p>
                        <p lang="zh-CN">我们由星辰所铸，如今遥望群星。</p>
                    </div>
                </div>
            </div>

            <div className="col-right">
                <div className="intro-box">
                    <h1>Kevin Zhong<span className="intro-handle"> / CLCK</span></h1>
                    <p>Founder, developer & photographer. Building inklet, studying ECE at UIUC, and following my curiosity.</p>
                    <div className="social-row">
                        <Link href="/portfolio" className="btn-projects">Projects</Link>
                        <div className="social-icons">
                            <a href="https://github.com/CLCK0622" aria-label="GitHub"><FaGithub size={18} /></a>
                            <a href="https://www.linkedin.com/in/clckkkkk/" aria-label="LinkedIn"><FaLinkedin size={18} /></a>
                            <a href="https://unsplash.com/@clck0622" aria-label="Unsplash"><FaUnsplash size={18} /></a>
                        </div>
                    </div>
                </div>

                {latestPosts[0] && (
                    <BentoCard
                        post={{ ...latestPosts[0], image: latestPosts[0].image || defaultImage }}
                        hasButton={true}
                    />
                )}
            </div>
        </div>
    );
}
