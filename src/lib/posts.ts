import fs from 'fs';
import path from 'path';
import { cache } from 'react';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkMath from 'remark-math';
import remarkRehype from 'remark-rehype';
import rehypeKatex from 'rehype-katex';
import rehypeStringify from 'rehype-stringify';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypePrettyCode from 'rehype-pretty-code';

const postsDirectory = path.join(process.cwd(), 'src/posts');

export interface PostData {
    id: string; title: string; date: string; updated?: string; tags: string[];
    description: string; image?: string; contentHtml?: string; snow?: boolean; lang: string;
}

function dateString(value: unknown) {
    if (value instanceof Date) return value.toISOString().split('T')[0];
    return typeof value === 'string' ? value : '';
}

function readPost(id: string) {
    // Restrict lookups to known post names, including when called outside the router.
    if (!/^[a-zA-Z0-9_-]+$/.test(id)) return null;
    const file = path.join(postsDirectory, `${id}.md`);
    if (!fs.existsSync(file)) return null;
    const { data, content } = matter(fs.readFileSync(file, 'utf8'));
    const title = typeof data.title === 'string' ? data.title : 'Untitled';
    const description = typeof data.description === 'string' && data.description.trim()
        ? data.description.trim()
        : `${title} — notes and reflections by Kevin Zhong.`;
    const post: PostData = {
        id, title, description, date: dateString(data.date), updated: dateString(data.updated) || undefined,
        tags: Array.isArray(data.tags) ? data.tags.filter((tag: unknown): tag is string => typeof tag === 'string') : [],
        image: typeof data.image === 'string' ? data.image : undefined,
        snow: data.snow === true,
        lang: typeof data.lang === 'string' ? data.lang : /[\u4e00-\u9fff]/.test(title + description) ? 'zh-CN' : 'en',
    };
    return { post, content };
}

export const getSortedPostsData = cache((): PostData[] => {
    if (!fs.existsSync(postsDirectory)) return [];
    return fs.readdirSync(postsDirectory).filter(file => file.endsWith('.md'))
        .map(file => readPost(file.slice(0, -3))?.post).filter((post): post is PostData => !!post)
        .sort((a, b) => b.date.localeCompare(a.date));
});

export const getPostData = cache(async (id: string): Promise<PostData | null> => {
    const result = readPost(id);
    if (!result) return null;
    const processed = await remark().use(remarkGfm).use(remarkMath)
        .use(remarkRehype, { allowDangerousHtml: true }).use(rehypeRaw)
        .use(rehypePrettyCode).use(rehypeKatex).use(rehypeStringify).process(result.content);
    // The page already has its article title as h1.
    const contentHtml = processed.toString().replace(/<h1(\s[^>]*)?>/g, '<h2$1>').replace(/<\/h1>/g, '</h2>');
    return { ...result.post, contentHtml };
});
