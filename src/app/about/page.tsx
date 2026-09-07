import {
    FaGithub, FaLinkedin, FaInstagram,
    FaSnapchatGhost
} from 'react-icons/fa';
import Image from "next/image";
import {FaMastodon, FaThreads, FaUnsplash, FaXTwitter} from "react-icons/fa6";
import {Metadata} from "next";
import {HiOutlineDocumentText, HiOutlineLocationMarker, HiOutlineMail} from "react-icons/hi";

export const metadata: Metadata = {
    title: 'About Me',
    description: 'Kevin Zhong — UIUC ECE student, founder of inklet, and developer building across client software, AI, and hardware.',
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
                        <p className="tagline">Founder, Developer & Photographer</p>
                        <div className="info-row">
                            <HiOutlineLocationMarker />
                            <span>Champaign, IL</span>
                        </div>
                        <div className="info-row">
                            <HiOutlineMail />
                            <a href="mailto:yiz29@illinois.edu">yiz29@illinois.edu</a>
                        </div>
                        <a className="resume-link" href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                            <HiOutlineDocumentText aria-hidden="true" />
                            Resume (PDF)
                        </a>

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
                        I&#39;m a second-year Grainger ECE student at the University of Illinois Urbana-Champaign. I build products that connect client software, AI, and hardware.
                    </p>

                    <p>
                        I&#39;m the founder of <a href="https://www.iminklet.com/">inklet</a>, where I develop our clients and SDK, design hardware structures, and lead marketing. Previously, I worked on Qoder at Alibaba Cloud. Beyond engineering, I enjoy photography and building communities.
                    </p>

                    <div className="skills-section">
                        <h4>Tech Stack</h4>
                        <div className="skills-category">
                            <span className="category-label">Languages</span>
                            <div className="skills-list">
                                <span className="skill-pill">C/C++</span>
                                <span className="skill-pill">Java</span>
                                <span className="skill-pill">Python</span>
                                <span className="skill-pill">Swift</span>
                                <span className="skill-pill">JavaScript</span>
                                <span className="skill-pill">TypeScript</span>
                                <span className="skill-pill">HTML/CSS</span>
                            </div>
                        </div>
                        <div className="skills-category">
                            <span className="category-label">Frameworks & Tools</span>
                            <div className="skills-list">
                                <span className="skill-pill">React</span>
                                <span className="skill-pill">Next.js</span>
                                <span className="skill-pill">Node.js</span>
                                <span className="skill-pill">PyTorch</span>
                                <span className="skill-pill">PostgreSQL</span>
                                <span className="skill-pill">Git</span>
                                <span className="skill-pill">Linux</span>
                                <span className="skill-pill">Arduino</span>
                                <span className="skill-pill">Onshape</span>
                            </div>
                        </div>
                    </div>

                    <div className="timeline-section">
                        <h4>Education</h4>
                        <div className="timeline">
                            <div className="timeline-item">
                                <div className="timeline-date">Aug 2025 – May 2029</div>
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
                                <div className="timeline-date">May 2026 – Present</div>
                                <div className="timeline-title">inklet LLC <span className="timeline-link">(<a href="https://www.iminklet.com/">iminklet.com</a>)</span></div>
                                <div className="timeline-desc">Founder & Chief Executive Member</div>
                                <p className="timeline-summary">
                                    I develop all inklet clients: Portal apps for web, macOS, Windows, and iOS, plus our <a href="https://docs.iminklet.com/">TypeScript SDK</a> for delivering content to e-ink displays. I also own the hardware structural design for our D1 e-ink displays and H1 local AI compute hubs, and direct all marketing from product positioning to launch campaigns.
                                </p>
                            </div>
                            <div className="timeline-item">
                                <div className="timeline-date">May 2026 – Aug 2026 · Hangzhou, China</div>
                                <div className="timeline-title">Alibaba Cloud <span className="timeline-link">(<a href="https://qoder.com/">qoder.com</a>)</span></div>
                                <div className="timeline-desc">Software Engineer Intern (Client & Web)</div>
                                <p className="timeline-summary">
                                    I shipped Qoder IDE features and fixes, including Quest Mode terminal lifecycle management and artifact review interactions. I owned the integration of Qoder Cloud Agents with Alibaba&#39;s internal Harness platform, helping scale onboarded agents from 800 to 2,000, and independently implemented Qoder&#39;s AR-glasses client.
                                </p>
                            </div>
                            <div className="timeline-item">
                                <div className="timeline-date">Oct 2025 – Aug 2026</div>
                                <div className="timeline-title">PivotHire Inc. <span className="timeline-link">(<a href="https://www.pivothire.tech/">pivothire.tech</a>)</span></div>
                                <div className="timeline-desc">Co-Founder</div>
                                <p className="timeline-summary">
                                    I built PivotHire&#39;s website and full-stack platform end to end, connecting US companies with engineering talent in China. The platform brings together project workflows, payments, and AI-assisted delivery, with agents supporting code review, timeline tracking, and client communication.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="timeline-section">
                        <h4>Research & Academic Service</h4>
                        <div className="timeline">
                            <div className="timeline-item">
                                <div className="timeline-date">WACV 2027 · Upcoming</div>
                                <div className="timeline-title"><a href="https://wacv27seai.synoring.ai/">Social Embodied AI (SEAI) Workshop</a></div>
                                <div className="timeline-desc">Co-organizer</div>
                                <p className="timeline-summary">
                                    I&#39;m co-organizing the 1st Workshop on Social Embodied AI, focused on multimodal perception and human–robot interaction.
                                </p>
                            </div>
                            <div className="timeline-item">
                                <div className="timeline-date">Dec 2023 – Oct 2024</div>
                                <div className="timeline-title"><a href="https://doi.org/10.36227/techrxiv.172902820.02096061/v1">Enhanced U-Net Usage for Road Network Prediction</a></div>
                                <div className="timeline-desc">TechRxiv preprint</div>
                                <p className="timeline-summary">
                                    I explored using U-Net with geospatial data to predict potential road networks. <a href="https://youtu.be/5nw5kZ7mg3Y">Watch the field research video.</a>
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="timeline-section">
                        <h4>Community & Leadership</h4>
                        <div className="timeline">
                            <div className="timeline-item">
                                <div className="timeline-date">May 2023 – Present</div>
                                <div className="timeline-title"><a href="https://wiki.firstrobotics.com.cn/">CNFRC Community</a></div>
                                <div className="timeline-desc">Founder & Maintainer</div>
                                <p className="timeline-summary">
                                    I founded an unofficial FRC community that now reaches over two-thirds of teams in China. I maintain its NodeBB forum and MkDocs wiki, and contribute Java documentation.
                                </p>
                            </div>
                            <div className="timeline-item">
                                <div className="timeline-date">Aug 2022 – Mar 2025 · Shanghai, China</div>
                                <div className="timeline-title">FRC Zodiac 6353</div>
                                <div className="timeline-desc">Team Captain & Programming Team Lead</div>
                                <p className="timeline-summary">
                                    I led a 35-member robotics team, overseeing programming, CAD, 3D printing, and laser cutting. We improved our ranking from the bottom tier to above average among more than 50 Chinese FRC teams.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
