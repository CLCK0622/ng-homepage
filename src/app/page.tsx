import BentoCard from './components/BentoCard';
import Link from 'next/link';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { getSortedPostsData } from '@/lib/posts';
import Image from "next/image";
import {FaUnsplash} from "react-icons/fa6";

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
                next: { revalidate: 75 }
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
            <div className="col-left">
                {latestPosts[0] ? (
                    <BentoCard
                        post={{ ...latestPosts[0], image: latestPosts[0].image || defaultImage }}
                        variant="tall"
                        hasButton={true}
                    />
                ) : (
                    <div className="bento-card tall" style={{background: '#f0f0f0', display:'flex', alignItems:'center', justifyContent:'center'}}>
                        <span style={{color:'#999'}}>Waiting for posts...</span>
                    </div>
                )}

                {latestPosts[1] && (
                    <BentoCard post={{ ...latestPosts[1], image: latestPosts[1].image || defaultImage }}
                               hasButton={true}/>
                )}
            </div>

            <div className="col-center">
                <div className="hero-container">
                    <Image src={heroImage} alt="Hero" width={4024} height={4024} />
                    <div className="hero-overlay">
                        <h1>We are made of star-stuff, now gazing back at the stars.</h1>
                        <h1>我们由星辰所铸，如今遥望群星。</h1>
                    </div>
                </div>
            </div>

            <div className="col-right">
                <div className="intro-box">
                    <p>Welcome to Kevin Zhong&#39;s digital garden. Weaving code, sculpting design, and pondering life.</p>
                    <div className="social-row">
                        <Link href="/portfolio" className="btn-projects">Projects</Link>
                        <div className="social-icons">
                            <a href="https://github.com/CLCK0622"><FaGithub size={18} /></a>
                            <a href="https://www.linkedin.com/in/clckkkkk/"><FaLinkedin size={18} /></a>
                            <a href="https://unsplash.com/@clck0622"><FaUnsplash size={18} /></a>
                        </div>
                    </div>
                </div>

                {latestPosts[2] && (
                    <BentoCard
                        post={{ ...latestPosts[2], image: latestPosts[2].image || defaultImage }}
                        hasButton={true}
                    />
                )}
            </div>
        </div>
    );
}