import Waitlist from '../components/Waitlist';

export default function Home() {
  return (
    <main className="shell">
      <div className="glow" aria-hidden="true" />

      <header className="brand">
        <span className="mark" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 12h4l3-8 4 16 3-8h4" />
          </svg>
        </span>
        <span className="wordmark">Outly</span>
        <span className="city">Brisbane</span>
      </header>

      <section className="hero">
        <p className="eyebrow">Launching soon</p>
        <h1>
          The best nights out and hands-on days in Brisbane,
          <em> in one place.</em>
        </h1>
        <p className="lede">
          Comedy and live music. Pottery, cooking, cocktails and more.
          One destination for everything worth doing — and gifting.
        </p>
        <Waitlist />
      </section>

      <footer className="foot">
        A working preview · not the final brand · built step by step
      </footer>
    </main>
  );
}
