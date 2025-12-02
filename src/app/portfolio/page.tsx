import Image from "next/image";
import Link from "next/link";

const PROJECTS = [
    {
        id: 1, title: '11ty Serene', category: 'Theme',
        href: 'https://github.com/CLCK0622/11ty-Serene',
        image: 'https://s2.loli.net/2025/12/02/HKAYoZVM57yTim6.png',
        description: 'A minimal theme for a landing page and an integrated blog. Built with 11ty and Sass.'
    },
    {
        id: 2, title: '11ty Serene', category: 'Theme',
        href: 'https://github.com/CLCK0622/11ty-Serene',
        image: 'https://s2.loli.net/2025/12/02/HKAYoZVM57yTim6.png',
        description: 'A minimal theme for a landing page and an integrated blog. Built with 11ty and Sass.'
    },
    {
        id: 3, title: '11ty Serene', category: 'Theme',
        href: 'https://github.com/CLCK0622/11ty-Serene',
        image: 'https://s2.loli.net/2025/12/02/HKAYoZVM57yTim6.png',
        description: 'A minimal theme for a landing page and an integrated blog. Built with 11ty and Sass.'
    },
    {
        id: 4, title: '11ty Serene', category: 'Theme',
        href: 'https://github.com/CLCK0622/11ty-Serene',
        image: 'https://s2.loli.net/2025/12/02/HKAYoZVM57yTim6.png',
        description: 'A minimal theme for a landing page and an integrated blog. Built with 11ty and Sass.'
    },
];

export default function Portfolio() {
    return (
        <div className="page-wrapper">
            <div className="page-header">
                <h1>Projects</h1>
                <p>A collection of my past experience and projects.</p>
            </div>

            <div className="projects-grid">
                {PROJECTS.map(item => (
                    <Link href={item.href} key={item.id} className="project-item">
                        <div className="img-box">
                            <Image src={item.image} alt={item.title} width={1024} height={576} />
                        </div>
                        <div className="info-box">
                            <span className="cat">{item.category}</span>
                            <h3>{item.title}</h3>
                            <p>{item.description}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}