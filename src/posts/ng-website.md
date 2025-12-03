---
title: "Redesigning my Personal Website"
date: "2025-12-03"
tags: ["Tech"]
description: "A deep dive into the technical details behind my new website."
image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"
---

I recently decided to overhaul my personal website. The goal was simple: move to the **Next.js App Router**, maintain a clean **Bento Grid** aesthetic, and push the boundaries of modern CSS to reduce reliance on JavaScript.

Here are three specific technical details that make this site special.

## 1. The "Gooey" Connection: Inverted Border Radius

If you look at the **Bento Cards** on the homepage, you'll notice the action button in the bottom-right corner doesn't just sit on top of the card; it feels "cut out" from it, with a smooth, organic curve connecting the button to the card body.

Achieving this "inverted border-radius" (often called the gooey effect) usually involves SVG filters or complex clip-paths. However, I achieved this using a classic, yet powerful CSS trick: **Box Shadows**.

### The Trick

The logic is to create a square pseudo-element, make it transparent, give it a border-radius on one corner, and then use a massive `box-shadow` to fill the surrounding space with the background color.

Here is the SCSS snippet from my source code:

```scss
.action-corner {
  position: absolute;
  bottom: -1px; 
  right: -1px;
  background: var(--bg-body); /* Match the page background */
  
  /* ... sizing and positioning ... */

  /* The magic happens here */
  &::before {
    content: "";
    position: absolute;
    top: -20px;
    right: 0;
    width: 20px;
    height: 20px;
    
    /* Curve the bottom-right corner */
    border-bottom-right-radius: 20px; 
    
    /* Use shadow to fill the "negative" space */
    box-shadow: 6px 6px 0 6px var(--bg-body);
  }
}
````

By applying this logic to both the top and left sides of the button container, we create a seamless, liquid-like connection that looks expensive but costs zero JavaScript.

## 2\. Zero-JS Reading Progress Bar

On individual blog post pages, I wanted a reading progress bar at the top. Historically, this required:

1.  `useEffect` hook.
2.  Adding a `scroll` event listener.
3.  Calculating `scrollTop` vs `scrollHeight`.
4.  Updating state on every frame (performance cost).

With the new **CSS Scroll-driven Animations** specification, we can do this entirely in CSS.

Credit here towards my friend [Will's blog post](https://blog.mrwillcom.com/2025/09/28/My-Home-Page-Reimagined/#animation-timeline-view) introducing this feature.

### The Implementation

First, we define a named timeline on the article container. This tells the browser to track the scroll position of this specific block.

```scss
.markdown-body {
  /* Define the timeline */
  view-timeline-name: --article-reading;
  view-timeline-axis: block;
}
```

Then, we bind the progress bar's animation to that timeline:

```scss
.reading-progress-bar {
  position: fixed;
  top: 0;
  left: 0;
  height: 4px;
  background: var(--text-primary);
  transform-origin: 0 50%;
  
  /* The animation changes width from 0% to 100% */
  animation: reading-progress linear both;
  
  /* Bind it to the timeline defined above */
  animation-timeline: --article-reading;
  
  /* Start when article enters view, end when it leaves */
  animation-range: entry 0% cover 100%;
}
```

### The Scope Issue

One tricky part I encountered was that the progress bar was a *sibling* of the article, not a child. CSS Timelines usually only work downwards. To fix this, I had to declare a **timeline-scope** on their shared parent:

```scss
.article-container {
  timeline-scope: --article-reading;
}
```

Now, the progress bar flows perfectly with the scroll, running off the compositor thread for buttery smooth performance.

## 3\. Server-Side GitHub Stats

For the Portfolio page, I wanted to display the real-time **Star** and **Fork** counts for my open-source projects. I didn't want to use client-side fetching (which causes layout shifts or "loading..." spinners).

Since I'm using **Next.js App Router**, I can fetch this data on the server during build time (or request time) and send fully rendered HTML to the client.

I created a utility function that extracts the repo name from the URL and queries the GitHub API:

```typescript
async function fetchGitHubData(repoUrl: string) {
  const match = repoUrl.match(/github\.com\/([^/]+)\/([^/]+)/);
  if (!match) return null;
  const [_, owner, repo] = match;
  
  const res = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
    next: { revalidate: 60 } // 60 unauthenticated requests per hour is 60 seconds each fetching
  });

  return await res.json();
}
```

Then, in my `page.tsx`, I use `Promise.all` to fetch data for multiple projects concurrently:

```typescript
export default async function Portfolio() {
  const projects = await Promise.all(
    PROJECTS_CONFIG.map(async (item) => {
      if (item.platform === 'github') {
        const ghData = await fetchGitHubData(item.href);
        return {
          ...item,
          stars: ghData?.stargazers_count,
          forks: ghData?.forks_count,
        };
      }
      return item;
    })
  );
  
  // Render...
}
```

This approach keeps the client bundle small and ensures search engines see the exact stats immediately.

## Conclusion

Rebuilding this site reminded me that the web platform is evolving fast. Also, please stay tuned as I plan to publish this site as a template for Next.js personal website and blogs, called **Next.js Stardust**.
