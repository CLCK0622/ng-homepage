import { ImageResponse } from 'next/og';

export const dynamic = 'force-static';

export function GET() {
    return new ImageResponse(
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%', height: '100%', padding: '76px 88px', background: '#f5f2eb', color: '#24241f' }}>
            <div style={{ display: 'flex', fontSize: 25, letterSpacing: 3 }}>@CLCK / A DIGITAL GARDEN</div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', fontSize: 96, fontWeight: 700 }}>Kevin Zhong</div>
                <div style={{ display: 'flex', width: 580, height: 18, background: '#e4cd7f', transform: 'rotate(-1deg)', marginTop: 8, marginBottom: 30 }} />
                <div style={{ display: 'flex', fontSize: 31 }}>Founder, developer & photographer.</div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#62625a', fontSize: 23 }}><span>Code, curiosity, and the everyday.</span><span>clckkkkk.site</span></div>
        </div>,
        { width: 1200, height: 630 },
    );
}
