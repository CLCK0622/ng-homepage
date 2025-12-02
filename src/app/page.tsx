import BentoCard from './components/BentoCard';
import Link from 'next/link';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { getSortedPostsData } from '@/lib/posts';

export default function Home() {
    const allPosts = getSortedPostsData();
    const latestPosts = allPosts.slice(0, 3);
    const defaultImage = "https://images.unsplash.com/photo-1518655048521-f130df041f66?q=80&w=2670&auto=format&fit=crop";

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
                    <BentoCard post={{ ...latestPosts[1], image: latestPosts[1].image || defaultImage }} />
                )}
            </div>

            <div className="col-center">
                <div className="hero-container">
                    <img src="https://images.unsplash.com/photo-1485230405346-71acb9518d9c?q=80&w=2694&auto=format&fit=crop" alt="Hero" />
                    <div className="hero-overlay">
                        <h1>Journey Through<br />Life&#39;s Spectrum</h1>
                        <div className="avatar-pill">
                            <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=60" alt="Kevin" />
                            <span>Kevin Zhong</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-right">
                <div className="intro-box">
                    <p>Welcome to my digital garden. A realm of reflection, code, and design where words illuminate paths of meaning.</p>
                    <div className="social-row">
                        <Link href="/portfolio" className="btn-projects">View Projects</Link>
                        <div className="social-icons">
                            <a href="#"><FaGithub size={18} /></a>
                            <a href="#"><FaLinkedin size={18} /></a>
                            <a href="#"><FaTwitter size={18} /></a>
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