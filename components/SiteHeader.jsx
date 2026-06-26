import Link from 'next/link';

export default function SiteHeader() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href="/" className="logo">
          <span className="logo-mark" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 12h4l3-8 4 16 3-8h4" />
            </svg>
          </span>
          <span className="logo-word">Outly</span>
          <span className="logo-city">Brisbane</span>
        </Link>
        <nav className="header-nav">
          <Link href="/">Discover</Link>
          <span className="header-soon">Sign in · soon</span>
        </nav>
      </div>
    </header>
  );
}
