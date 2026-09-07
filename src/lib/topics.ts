import type { PostData } from './posts';

export const topics = [
    { slug: 'agents', title: 'Agents & AI', description: 'Notes on agent engineering, learning, and building with AI.', posts: ['superpowers-and-loop-engineering', 'a-design-for-an-agents-mind', 'hallucination-ai-era', '2028gic'] },
    { slug: 'homelab', title: 'The home lab', description: 'Virtual machines, a Mac-powered home lab, and getting it all online.', posts: ['mac-vm', 'cfd-config', 'newmbp'] },
];

export function getRelatedPosts(post: PostData, allPosts: PostData[]) {
    const topic = topics.find(topic => topic.posts.includes(post.id));
    return allPosts.filter(other => other.id !== post.id)
        .map(other => ({ post: other, score: (topic?.posts.includes(other.id) ? 10 : 0) + other.tags.filter(tag => post.tags.includes(tag)).length }))
        .filter(item => item.score > 0).sort((a, b) => b.score - a.score || b.post.date.localeCompare(a.post.date))
        .slice(0, 3).map(item => item.post);
}
