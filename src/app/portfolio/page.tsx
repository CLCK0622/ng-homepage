import Image from "next/image";
import Link from "next/link";
import { FaStar, FaCodeBranch, FaGithub } from "react-icons/fa";

// 定义项目接口
interface ProjectConfig {
    id: number;
    title: string;
    category: string;
    platform?: 'github' | 'web' | string; // 新增 platform 字段
    href?: string;       // 可选，不填则用 GH 链接
    image?: string;      // 可选，不填则用 GH 头像或默认图
    description?: string;// 可选，不填则用 GH 简介
}

// 你的原始配置
const PROJECTS_CONFIG: ProjectConfig[] = [
    {
        id: 1,
        title: '11ty Serene',
        category: 'Theme',
        platform: 'github',
        href: 'https://github.com/CLCK0622/11ty-Serene',
        image: 'https://s2.loli.net/2025/12/02/HKAYoZVM57yTim6.png',
        description: 'A minimal theme for a landing page and an integrated blog. Built with 11ty and Sass.'
    },
    {
        id: 2,
        title: 'Eventual',
        category: 'iOS App',
        platform: 'github',
        href: 'https://github.com/CLCK0622/Eventual',
        image: 'https://s2.loli.net/2025/12/03/O7VnfaTHk2DcS96.png'
    },
    {
        id: 3,
        title: 'IEM Website',
        category: 'Website',
        platform: 'github',
        href: 'https://github.com/mtsun05/iem-website',
        description: "Next generation website for Illini Electric Motorsports RSO with Vite, R3F, shadcn/ui, and Tailwind CSS."
    },
    {
        id: 4,
        title: 'TensorFlow MobileNet Demo',
        category: 'Website',
        platform: 'github',
        href: 'https://github.com/CLCK0622/TensorFlow-MobileNet-Starter-Program',
        image: 'https://user-images.githubusercontent.com/36215258/216369517-4b207d1b-5fa6-4e7d-84a2-451063a622e1.png',
        description: 'A starter AI program (online demo) using TensorFlow MobileNet, which features AI image processing and classification.'
    },
    {
        id: 5,
        title: 'CNFRC Community',
        category: 'Organization',
        platform: 'web',
        href: 'https://github.com/FRC-China',
        image: 'https://raw.githubusercontent.com/FRC-China/properties/refs/heads/main/social%20image.PNG',
        description: 'The first ever student-led non-profit organization for FRC teams based in China.'
    },
    {
        id: 6,
        title: 'CNFRC Wiki',
        category: 'Website',
        platform: 'github',
        href: 'https://github.com/FRC-China/FRC-Wiki',
        image: 'https://raw.githubusercontent.com/FRC-China/properties/refs/heads/main/social%20image.PNG',
        description: 'The Mandarin wikipedia for CNFRC Community.'
    },
    {
        id: 7,
        title: 'Shanghai High School Knowledge',
        category: 'Website',
        platform: 'github',
        href: 'https://github.com/CLCK0622/Shanghai-High-School-Knowledge',
        image: 'https://raw.githubusercontent.com/CLCK0622/Shanghai-High-School-Knowledge/refs/heads/main/public/favicon-social.png',
        description: 'Knowledge sharing platform for students in Shanghai standard senior high school.'
    },
    {
        id: 8,
        title: 'Hackintosh OpenCore EFI',
        category: 'Hackintosh',
        platform: 'github',
        href: 'https://github.com/CLCK0622/ASUS-Z490P-10700k-6600xt_Hackintosh-OpenCore-EFI',
        image: 'https://i.redd.it/e6q067upouvc1.png',
        description: 'An OpenCore EFI for: ASUS Prime Z490P + i7 i0700k + AMD RX 6600 XT + RTL 8111 + AX 200.'
    },
    {
        id: 9,
        title: 'SyncUP',
        category: 'Website',
        platform: 'github',
        href: 'https://github.com/CLCK0622/syncup',
        image: 'https://s2.loli.net/2025/12/03/7ZTUNPCGj964dk3.png',
        description: 'SyncUP finds when your free time overlaps with others and suggests activities you can do together.'
    },
    {
        id: 10,
        title: 'MuseDeck',
        category: 'Product',
        platform: 'web',
        href: 'https://github.com/MuseDeck',
        image: 'https://private-user-images.githubusercontent.com/36215258/521730316-cd369ad2-dfff-4d23-bf07-0b4f9f4010e2.png?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NjQ3NDU1NTEsIm5iZiI6MTc2NDc0NTI1MSwicGF0aCI6Ii8zNjIxNTI1OC81MjE3MzAzMTYtY2QzNjlhZDItZGZmZi00ZDIzLWJmMDctMGI0ZjlmNDAxMGUyLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNTEyMDMlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjUxMjAzVDA3MDA1MVomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTVmYTllNTE4NDQ4ZmQ2ZTRiN2JmM2ZjMTYwZTNkZGQxOGE4YjYzZGJhY2IwMjdmODhiOGJlZjQ3M2JkYjI2ZTcmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.ujxj7VRpSIBO79CQjYhAQOgKgq9hD9_b9FeumxrwlkM',
        description: 'An open-source, AI-native knowledge display system designed to turn your scattered information into a seamless, non-intrusive stream of inspiration.'
    },
];

async function fetchGitHubData(repoUrl: string) {
    try {
        const match = repoUrl.match(/github\.com\/([^/]+)\/([^/]+)/);
        if (!match) return null;

        const [_, owner, repo] = match;

        const res = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
            next: { revalidate: 60 }
        });

        if (!res.ok) return null;

        return await res.json();
    } catch (error) {
        console.error(`Failed to fetch repo ${repoUrl}`, error);
        return null;
    }
}

export default async function Portfolio() {
    const projects = await Promise.all(
        PROJECTS_CONFIG.map(async (item) => {
            let ghData = null;

            if (item.platform?.toLowerCase() === 'github' && item.href) {
                ghData = await fetchGitHubData(item.href);
            }

            return {
                ...item,
                href: item.href || ghData?.html_url || '#',
                description: item.description || ghData?.description || 'No description provided.',
                image: item.image || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2670&auto=format&fit=crop',
                stars: ghData?.stargazers_count,
                forks: ghData?.forks_count,
            };
        })
    );

    return (
        <div className="page-wrapper">
            <div className="page-header">
                <h1>Projects</h1>
                <p>A collection of my past experience and open source contributions.</p>
            </div>

            <div className="projects-grid">
                {projects.map((item) => (
                    <Link href={item.href} key={item.id} className="project-item" target="_blank">
                        <div className="img-box">
                            <Image
                                src={item.image}
                                alt={item.title}
                                width={1024}
                                height={576}
                                className="card-img"
                            />
                        </div>

                        <div className="info-box">
                            <div className="info-meta">
                                <span className="cat">{item.category}</span>
                                {item.stars !== undefined && (
                                    <div className="gh-stats">
                                        <div className="stat">
                                            <FaStar className="icon star" />
                                            <span>{item.stars > 999 ? (item.stars / 1000).toFixed(1) + 'k' : item.stars}</span>
                                        </div>
                                        <div className="stat">
                                            <FaCodeBranch className="icon" />
                                            <span>{item.forks > 999 ? (item.forks / 1000).toFixed(1) + 'k' : item.forks}</span>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <h3>{item.title}</h3>
                            <p>{item.description}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}