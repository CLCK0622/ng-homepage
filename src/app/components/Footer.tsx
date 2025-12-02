export default function Footer() {
    const year = new Date().getFullYear();
    return (
        <footer className="footer">
            <div>&copy; {year} Kevin Zhong. All Rights Reserved.</div>
            <div>Built with Next.js</div>
        </footer>
    );
}