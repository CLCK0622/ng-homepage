import type { ReactNode } from 'react';

export default function PageHeader({ title, description, eyebrow, action }: {
    title: string; description: string; eyebrow: string; action?: ReactNode;
}) {
    return <header className="page-header">
        <p className="page-eyebrow">{eyebrow}</p>
        <h1><span>{title}</span></h1>
        <p className="page-description">{description}</p>
        {action && <div className="page-header-action">{action}</div>}
    </header>;
}
