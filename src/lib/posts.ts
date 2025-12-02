import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'src/posts');

export interface PostData {
    id: string;
    title: string;
    date: string;
    tags: string[];
    description: string;
    image?: string;
    contentHtml?: string;
}

export function getSortedPostsData(): PostData[] {
    if (!fs.existsSync(postsDirectory)) {
        console.warn(`Warning: Posts directory not found at ${postsDirectory}`);
        return [];
    }

    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames
        .filter((fileName) => fileName.endsWith('.md'))
        .map((fileName) => {
            const id = fileName.replace(/\.md$/, '');
            const fullPath = path.join(postsDirectory, fileName);
            const fileContents = fs.readFileSync(fullPath, 'utf8');
            const matterResult = matter(fileContents);

            let dateStr = '';
            const rawDate = matterResult.data.date;
            if (rawDate instanceof Date) {
                dateStr = rawDate.toISOString().split('T')[0];
            } else if (rawDate) {
                dateStr = String(rawDate);
            }

            return {
                id,
                ...(matterResult.data as any),
                date: dateStr,
                tags: matterResult.data.tags || [],
                description: matterResult.data.description || '',
                title: matterResult.data.title || 'Untitled',
                image: matterResult.data.image || ''
            } as PostData;
        });

    return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPostData(id: string) {
    const fullPath = path.join(postsDirectory, `${id}.md`);

    if (!fs.existsSync(fullPath)) {
        throw new Error(`Post file not found: ${fullPath}`);
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    const processedContent = await remark()
        .use(html)
        .process(matterResult.content);
    const contentHtml = processedContent.toString();

    let dateStr = '';
    const rawDate = matterResult.data.date;
    if (rawDate instanceof Date) {
        dateStr = rawDate.toISOString().split('T')[0];
    } else if (rawDate) {
        dateStr = String(rawDate);
    }

    return {
        id,
        contentHtml,
        ...(matterResult.data as any),
        date: dateStr,
        tags: matterResult.data.tags || [],
    };
}