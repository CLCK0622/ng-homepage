import {
    FaGithub, FaLinkedin, FaInstagram,
    FaSnapchatGhost
} from 'react-icons/fa';
import Image from "next/image";
import {FaMastodon, FaThreads, FaUnsplash, FaXTwitter} from "react-icons/fa6";
import {Metadata} from "next";
import {HiOutlineLocationMarker, HiOutlineMail} from "react-icons/hi";

export const metadata: Metadata = {
    title: 'About Me',
    description: 'Developer, Photographer, Storyteller.',
};

export default function About() {
    return (
        <div className="page-wrapper">
            <div className="about-grid">
                <div className="about-left">
                    <Image
                        src="/photo-bg.png"
                        width={450}
                        height={650}
                        alt="Kevin"
                        className="profile-img"
                    />
                    <div className="info-card">
                        <h3>Kevin Zhong</h3>
                        <p className="tagline">Developer & Photographer</p>
                        <div className="info-row">
                            <HiOutlineLocationMarker />
                            <span>Champaign, IL</span>
                        </div>
                        <div className="info-row">
                            <HiOutlineMail />
                            <span>kevin.zhong@pivothire.tech</span>
                        </div>

                        <div className="social-icons-row">
                            <a href="https://github.com/CLCK0622" aria-label="GitHub"><FaGithub /></a>
                            <a href="https://www.linkedin.com/in/clckkkkk/" aria-label="LinkedIn"><FaLinkedin style={{color: '#0077b5'}} /></a>
                            <a href="https://unsplash.com/@clck0622" aria-label="Unsplash"><FaUnsplash /></a>
                            <a href="https://x.com/CLCKKKKK" aria-label="X"><FaXTwitter /></a>
                            <a href="https://www.instagram.com/clck0622/" aria-label="Instagram"><FaInstagram style={{color: '#c13584'}} /></a>
                            <a href="https://mastodon.social/@CLCKKKKK" aria-label="Mastodon"><FaMastodon style={{color: '#6364ff'}} /></a>
                            <a href="https://www.snapchat.com/@clck0622" aria-label="Snapchat"><FaSnapchatGhost style={{color: '#fffc00'}} /></a>
                            <a href="https://www.threads.com/@clck0622" aria-label="Threads"><FaThreads /></a>
                        </div>
                    </div>
                </div>

                <div className="bio">
                    <h2>About Me</h2>
                    <p>
                        Hello! I&#39;m <strong>Kevin Zhong</strong>.
                        I&#39;m currently a first-year Grainger ECE student at the University of Illinois Urbana-Champaign. I build and lead technology projects at the intersection of blockchain, AI, and community.
                    </p>

                    <div className="skills-section">
                        <h4>Tech Stack</h4>
                        <div className="skills-category">
                            <span className="category-label">Languages</span>
                            <div className="skills-list">
                                <span className="skill-pill">C/C++</span>
                                <span className="skill-pill">Java</span>
                                <span className="skill-pill">Python</span>
                                <span className="skill-pill">JavaScript</span>
                                <span className="skill-pill">TypeScript</span>
                                <span className="skill-pill">HTML/CSS</span>
                                <span className="skill-pill">Arduino</span>
                            </div>
                        </div>
                        <div className="skills-category">
                            <span className="category-label">Frameworks & Libraries</span>
                            <div className="skills-list">
                                <span className="skill-pill">React</span>
                                <span className="skill-pill">Next.js</span>
                                <span className="skill-pill">Node.js</span>
                                <span className="skill-pill">PyTorch</span>
                                <span className="skill-pill">SwiftUI</span>
                                <span className="skill-pill">Sass</span>
                                <span className="skill-pill">Tailwind CSS</span>
                                <span className="skill-pill">Framer Motion</span>
                                <span className="skill-pill">Three.js</span>
                                <span className="skill-pill">Eleventy</span>
                            </div>
                        </div>
                        <div className="skills-category">
                            <span className="category-label">Tools</span>
                            <div className="skills-list">
                                <span className="skill-pill">PostgreSQL</span>
                                <span className="skill-pill">Git</span>
                                <span className="skill-pill">GitHub</span>
                                <span className="skill-pill">Linux</span>
                                <span className="skill-pill">Ethereum</span>
                            </div>
                        </div>
                    </div>

                    <div className="timeline-section">
                        <h4>Education</h4>
                        <div className="timeline">
                            <div className="timeline-item">
                                <div className="timeline-date">2025 – Jun 2029</div>
                                <div className="timeline-title">University of Illinois Urbana-Champaign</div>
                                <div className="timeline-desc">B.S. in Electrical & Electronics Engineering</div>
                            </div>
                            <div className="timeline-item">
                                <div className="timeline-date">Jun 2024 – Jul 2024</div>
                                <div className="timeline-title">Johns Hopkins Whiting School of Engineering</div>
                                <div className="timeline-desc">Explore Engineering Innovation: In Person</div>
                            </div>
                            <div className="timeline-item">
                                <div className="timeline-date">Sep 2022 – Jun 2025</div>
                                <div className="timeline-title">No.2 High School of East China Normal University</div>
                                <div className="timeline-desc">Senior High School Diploma</div>
                            </div>
                        </div>
                    </div>

                    <div className="timeline-section">
                        <h4>Work</h4>
                        <div className="timeline">
                            <div className="timeline-item">
                                <div className="timeline-date">Jun 2026 – Aug 2026</div>
                                <div className="timeline-title">Alibaba Cloud</div>
                                <div className="timeline-desc">Summer Intern, Qoder</div>
                            </div>
                            <div className="timeline-item">
                                <div className="timeline-date">Apr 2026 – Present</div>
                                <div className="timeline-title">inklet LLC</div>
                                <div className="timeline-desc">Chief Executive Member</div>
                            </div>
                            <div className="timeline-item">
                                <div className="timeline-date">Oct 2025 – Present</div>
                                <div className="timeline-title">PivotHire Inc.</div>
                                <div className="timeline-desc">Co-Founder</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
