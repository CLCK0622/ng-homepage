"use client";

import {useEffect, useState} from "react";

export default function Footer() {
    const year = new Date().getFullYear();
    const [views, setViews] = useState<number | null>(null);

    useEffect(() => {
        // 这里的 namespace 建议改成你的真实域名，确保唯一性
        const NAMESPACE = 'kevin-portfolio-v1';
        const KEY = 'visits';

        // 每次加载页面，请求 '/up' 接口（计数+1 并返回最新值）
        fetch(`https://api.counterapi.dev/v1/${NAMESPACE}/${KEY}/up`)
            .then((res) => res.json())
            .then((data) => {
                if (data && data.count) {
                    setViews(data.count);
                }
            })
            .catch((err) => console.error('CounterAPI Error:', err));
    }, []);

    // 格式化数字（例如 1200 -> 1,200）
    const formattedViews = views ? views.toLocaleString() : '--';

    return (
        <footer className="footer">
            <div>&copy; {year} Kevin Zhong. All Rights Reserved.</div>
            <div className="visitor-count">
                <span>
                    Visitors: <span className="count-num">{formattedViews}</span>
                </span>
            </div>
            <div>Built with Next.js, deployed on Vercel.</div>
        </footer>
    );
}