import {
    FaGithub, FaLinkedin, FaTwitter, FaInstagram,
    FaDribbble, FaSteam
} from 'react-icons/fa';
import { SiBilibili, SiZhihu } from 'react-icons/si';

export default function About() {
    return (
        <div className="page-wrapper">
            <div className="about-grid">
                <div className="img-container">
                    <img
                        src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=2670&auto=format&fit=crop"
                        alt="Kevin"
                        className="profile-img"
                    />
                </div>

                <div className="bio">
                    <h2>About Me</h2>
                    <p>
                        Hello! I&#39;m <strong>Kevin Zhong</strong>, a multidisciplinary creative based in Shanghai.
                        I bridge the gap between engineering and design, focusing on building accessible and immersive web experiences.
                    </p>
                    <p>
                        My toolkit includes React (Next.js), TypeScript, and a love for clean SCSS.
                        When I&#39;m not coding, I&#39;m exploring street photography or writing about the intersection of tech and culture.
                    </p>

                    <div className="connect-grid">
                        <h4>Connect</h4>
                        <div className="grid">
                            <a href="#" className="connect-link">
                                <FaGithub className="icon"/> <span>GitHub</span>
                            </a>
                            <a href="#" className="connect-link">
                                <FaLinkedin className="icon" style={{color: '#0077b5'}}/> <span>LinkedIn</span>
                            </a>
                            <a href="#" className="connect-link">
                                <SiBilibili className="icon" style={{color: '#00a1d6'}}/> <span>Bilibili</span>
                            </a>
                            <a href="#" className="connect-link">
                                <SiZhihu className="icon" style={{color: '#0084ff'}}/> <span>Zhihu</span>
                            </a>
                            <a href="#" className="connect-link">
                                <FaDribbble className="icon" style={{color: '#ea4c89'}}/> <span>Dribbble</span>
                            </a>
                            <a href="#" className="connect-link">
                                <FaSteam className="icon" style={{color: '#1b2838'}}/> <span>Steam</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}