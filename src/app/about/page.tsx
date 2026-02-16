import {
    FaGithub, FaLinkedin, FaTwitter, FaInstagram,
    FaDribbble, FaSteam, FaSnapchatGhost
} from 'react-icons/fa';
import { SiBilibili, SiZhihu } from 'react-icons/si';
import Image from "next/image";
import {FaMastodon, FaSnapchat, FaThreads, FaUnsplash, FaXTwitter} from "react-icons/fa6";
import {MdAttachEmail} from "react-icons/md";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: 'About Me',
    description: 'Developer, Photographer, Storyteller.',
};

export default function About() {
    return (
        <div className="page-wrapper">
            <div className="about-grid">
                <div className="img-container">
                    <Image
                        src="/photo-bg.png"
                        width={450}
                        height={650}
                        alt="Kevin"
                        className="profile-img"
                    />
                </div>

                <div className="bio">
                    <h2>About Me</h2>
                    <p>
                        Hello! I&#39;m <strong>Kevin Zhong</strong>.
                        I&#39;m currently a first-year Grainger ECE student at the University of Illinois Urbana-Champaign. I build and lead technology projects at the intersection of blockchain, AI, and community.
                    </p>
                    <p>
                        My toolkit includes React (Next.js), TypeScript, C/C++, PyTorch, Swift, etc.
                        When I&#39;m not coding, I&#39;m exploring street photography or writing about tech and culture.
                    </p>

                    <div className="connect-grid">
                        <h4>Connect</h4>
                        <div className="grid">
                            <a href="https://github.com/CLCK0622" className="connect-link">
                                <FaGithub className="icon"/> <span>GitHub</span>
                            </a>
                            <a href="https://www.linkedin.com/in/clckkkkk/" className="connect-link">
                                <FaLinkedin className="icon" style={{color: '#0077b5'}}/> <span>LinkedIn</span>
                            </a>
                            <a href="https://unsplash.com/@clck0622" className="connect-link">
                                <FaUnsplash className="icon" style={{color: '#111111'}}/> <span>Unsplash</span>
                            </a>
                            <a href="https://x.com/CLCKKKKK" className="connect-link">
                                <FaXTwitter className="icon" style={{color: '#000000'}}/> <span>X</span>
                            </a>
                            <a href="https://www.instagram.com/clck0622/" className="connect-link">
                                <FaInstagram className="icon" style={{color: '#c13584'}}/> <span>Instagram</span>
                            </a>
                            <a href="https://mastodon.social/@CLCKKKKK" className="connect-link">
                                <FaMastodon className="icon" style={{color: '#6364ff'}}/> <span>Mastodon</span>
                            </a>
                            <a href="https://www.snapchat.com/@clck0622" className="connect-link">
                                <FaSnapchatGhost className="icon" style={{color: '#fffc00'}}/> <span>Snapchat</span>
                            </a>
                            <a href="https://www.threads.com/@clck0622" className="connect-link">
                                <FaThreads className="icon" style={{color: '#0a0a0a'}}/> <span>Threads</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}