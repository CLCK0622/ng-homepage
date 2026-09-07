import Link from 'next/link';
import { notFound } from 'next/navigation';
import { caseStudies } from '@/lib/caseStudies';
import { pageMetadata, person } from '@/lib/seo';
import { SITE_URL } from '@/lib/constants';
import StructuredData from '@/app/components/StructuredData';

export const dynamicParams = false;
export function generateStaticParams() { return caseStudies.map(project => ({ slug: project.slug })); }
type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props) {
    const { slug } = await params;
    const project = caseStudies.find(project => project.slug === slug);
    if (!project) notFound();
    return pageMetadata(`${project.title} — Project Notes`, project.description, `/portfolio/${slug}`);
}
export default async function CaseStudy({ params }: Props) {
    const { slug } = await params;
    const project = caseStudies.find(project => project.slug === slug);
    if (!project) notFound();
    return <div className="page-wrapper case-study">
        <StructuredData data={{ '@context': 'https://schema.org', '@type': 'CreativeWork', name: project.title, description: project.description, creator: person, url: `${SITE_URL}/portfolio/${slug}` }} />
        <Link className="text-link" href="/portfolio">← All projects</Link>
        <header><p className="page-eyebrow">{project.category}</p><h1>{project.title}</h1><p className="case-intro">{project.description}</p><div className="case-meta"><span>{project.role}</span><span>{project.period}</span></div></header>
        <div className="case-stack">{project.stack.map(item => <span key={item}>{item}</span>)}</div>
        {project.sections.map(section => <section key={section.title}><h2>{section.title}</h2><p>{section.body}</p></section>)}
        <div className="case-links"><a className="pill-link" href={project.website} target="_blank" rel="noopener noreferrer">Visit {project.title} ↗</a>{project.extraLink && <a className="text-link" href={project.extraLink.href} target="_blank" rel="noopener noreferrer">{project.extraLink.label} ↗</a>}</div>
    </div>;
}
