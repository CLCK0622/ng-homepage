'use client';

import Giscus from '@giscus/react';

export default function Comments() {
    return (
        <div style={{ marginTop: '3rem' }}>
            <Giscus
                id="comments"
                repo="CLCK0622/ng-homepage"
                repoId="R_kgDOQgtV-A"
                category="General"
                categoryId="DIC_kwDOQgtV-M4CzRZZ"
                mapping="pathname"
                strict="0"
                reactionsEnabled="1"
                emitMetadata="0"
                inputPosition="top"
                theme="light"
                lang="en"
            />
        </div>
    );
}