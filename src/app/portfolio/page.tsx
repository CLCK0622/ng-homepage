const PROJECTS = [
    {
        id: 1, title: 'Neon Dash', category: 'Web App',
        image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2670&auto=format&fit=crop',
        description: 'A high-performance dashboard for crypto analytics.'
    },
    {
        id: 2, title: 'Zen Notes', category: 'Productivity',
        image: 'https://images.unsplash.com/photo-1517842645767-c639042777db?q=80&w=2670&auto=format&fit=crop',
        description: 'Minimalist markdown editor with cloud sync.'
    },
    {
        id: 3, title: 'Echo UI', category: 'Design System',
        image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=2670&auto=format&fit=crop',
        description: 'React component library focusing on accessibility.'
    },
    {
        id: 4, title: 'Urban O', category: 'Photography',
        image: 'https://images.unsplash.com/photo-1449824913929-49aa76fff2fe?q=80&w=2670&auto=format&fit=crop',
        description: 'Street photography portfolio showcase.'
    }
];

export default function Portfolio() {
    return (
        <div className="page-wrapper">
            <div className="page-header">
                <h1>Selected Works</h1>
                <p>A collection of digital experiences and technical experiments.</p>
            </div>

            <div className="projects-grid">
                {PROJECTS.map(item => (
                    <div key={item.id} className="project-item">
                        <div className="img-box">
                            <img src={item.image} alt={item.title} />
                        </div>
                        <div className="info-box">
                            <span className="cat">{item.category}</span>
                            <h3>{item.title}</h3>
                            <p>{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}