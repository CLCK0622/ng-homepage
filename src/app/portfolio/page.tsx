import Image from "next/image";
import Link from "next/link";

const PROJECTS = [
    {
        id: 1, title: '11ty Serene', category: 'Theme',
        href: 'https://github.com/CLCK0622/11ty-Serene',
        image: 'https://private-user-images.githubusercontent.com/36215258/521116732-4cb8e646-6c38-49db-b80d-8f8685677eb4.png?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NjQ2NDkwOTIsIm5iZiI6MTc2NDY0ODc5MiwicGF0aCI6Ii8zNjIxNTI1OC81MjExMTY3MzItNGNiOGU2NDYtNmMzOC00OWRiLWI4MGQtOGY4Njg1Njc3ZWI0LnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNTEyMDIlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjUxMjAyVDA0MTMxMlomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTMxNDU2M2Q0OTg5NDg2MWZlNDNkOTZkOWQxOWEzZWU4MTcwZDhiNjE4NDMwZmI0YzMzNTQxNTA0ZWI0YzQzMTAmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.NPQC16UXhXHzhJMzbqcqouXr3QqsucUjpyCMDUZjXRo',
        description: 'A minimal theme for a landing page and an integrated blog. Built with 11ty and Sass.'
    },
    {
        id: 2, title: '11ty Serene', category: 'Theme',
        href: 'https://github.com/CLCK0622/11ty-Serene',
        image: 'https://private-user-images.githubusercontent.com/36215258/521116732-4cb8e646-6c38-49db-b80d-8f8685677eb4.png?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NjQ2NDkwOTIsIm5iZiI6MTc2NDY0ODc5MiwicGF0aCI6Ii8zNjIxNTI1OC81MjExMTY3MzItNGNiOGU2NDYtNmMzOC00OWRiLWI4MGQtOGY4Njg1Njc3ZWI0LnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNTEyMDIlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjUxMjAyVDA0MTMxMlomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTMxNDU2M2Q0OTg5NDg2MWZlNDNkOTZkOWQxOWEzZWU4MTcwZDhiNjE4NDMwZmI0YzMzNTQxNTA0ZWI0YzQzMTAmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.NPQC16UXhXHzhJMzbqcqouXr3QqsucUjpyCMDUZjXRo',
        description: 'A minimal theme for a landing page and an integrated blog. Built with 11ty and Sass.'
    },
    {
        id: 3, title: '11ty Serene', category: 'Theme',
        href: 'https://github.com/CLCK0622/11ty-Serene',
        image: 'https://private-user-images.githubusercontent.com/36215258/521116732-4cb8e646-6c38-49db-b80d-8f8685677eb4.png?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NjQ2NDkwOTIsIm5iZiI6MTc2NDY0ODc5MiwicGF0aCI6Ii8zNjIxNTI1OC81MjExMTY3MzItNGNiOGU2NDYtNmMzOC00OWRiLWI4MGQtOGY4Njg1Njc3ZWI0LnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNTEyMDIlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjUxMjAyVDA0MTMxMlomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTMxNDU2M2Q0OTg5NDg2MWZlNDNkOTZkOWQxOWEzZWU4MTcwZDhiNjE4NDMwZmI0YzMzNTQxNTA0ZWI0YzQzMTAmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.NPQC16UXhXHzhJMzbqcqouXr3QqsucUjpyCMDUZjXRo',
        description: 'A minimal theme for a landing page and an integrated blog. Built with 11ty and Sass.'
    },
    {
        id: 4, title: '11ty Serene', category: 'Theme',
        href: 'https://github.com/CLCK0622/11ty-Serene',
        image: 'https://private-user-images.githubusercontent.com/36215258/521116732-4cb8e646-6c38-49db-b80d-8f8685677eb4.png?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NjQ2NDkwOTIsIm5iZiI6MTc2NDY0ODc5MiwicGF0aCI6Ii8zNjIxNTI1OC81MjExMTY3MzItNGNiOGU2NDYtNmMzOC00OWRiLWI4MGQtOGY4Njg1Njc3ZWI0LnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNTEyMDIlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjUxMjAyVDA0MTMxMlomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTMxNDU2M2Q0OTg5NDg2MWZlNDNkOTZkOWQxOWEzZWU4MTcwZDhiNjE4NDMwZmI0YzMzNTQxNTA0ZWI0YzQzMTAmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.NPQC16UXhXHzhJMzbqcqouXr3QqsucUjpyCMDUZjXRo',
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