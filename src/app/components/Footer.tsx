export default function Footer() {
    const year = new Date().getFullYear();
    return (
        <footer className="footer">
            <div>© {year} Kevin Zhong. All Rights Reserved.</div>
            <div>Designed in Shanghai & Built with Next.js</div>
        </footer>
    );
}