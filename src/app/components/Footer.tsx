"use client";

import {useEffect, useState} from "react";

export default function Footer() {
    const year = new Date().getFullYear();
    const [views, setViews] = useState<number | null>(null);

    useEffect(() => {
        const NAMESPACE = 'www.clckkkkk.site';
        const KEY = 'visits';

        fetch(`https://api.counterapi.dev/v1/${NAMESPACE}/${KEY}/up`)
            .then((res) => res.json())
            .then((data) => {
                if (data && data.count) {
                    setViews(data.count);
                }
            })
            .catch((err) => console.error('CounterAPI Error:', err));
    }, []);

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