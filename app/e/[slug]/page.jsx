import Link from 'next/link';
import { getListingBySlug } from '../../../lib/supabase';
import { formatDate, formatPrice } from '../../../lib/format';
import BookingPanel from '../../../components/BookingPanel';

export const dynamic = 'force-dynamic';

export default async function ListingPage({ params }) {
  const listing = await getListingBySlug(params.slug);

  if (!listing) {
    return (
      <main className="container section">
        <Link href="/" className="back-link">← Back to discover</Link>
        <h1 className="pdp-title">Listing not found</h1>
        <p>It may have been removed, or the link is wrong.</p>
      </main>
    );
  }

  const {
    title, image, category, host, venue, summary, description,
    upcoming, ticketTypes, durationMinutes, isGiftable, fromPrice, type,
  } = listing;

  const rating = host?.rating != null ? Number(host.rating) : null;
  const initials = (host?.name || 'O')
    .split(/\s+/).slice(0, 2).map((w) => w[0]).join('').toUpperCase();

  return (
    <main>
      <div className="pdp-hero" style={{ backgroundImage: `url(${image})` }}>
        <div className="pdp-hero-overlay" />
      </div>

      <div className="container pdp">
        <div className="pdp-main">
          <Link href="/" className="back-link">← Back to discover</Link>

          <div className="pdp-badges">
            {category && (
              <span className="pill-cat"><span aria-hidden="true">{category.emoji}</span> {category.name}</span>
            )}
            {isGiftable && <span className="pill-gift">🎁 Giftable</span>}
            <span className="pill-type">{type === 'event' ? 'Event' : 'Experience'}</span>
          </div>

          <h1 className="pdp-title">{title}</h1>
          <p className="pdp-meta">
            {host?.name}
            {venue?.suburb ? ` · ${venue.suburb}, Brisbane` : ''}
            {rating ? ` · ★ ${rating.toFixed(1)}${host?.reviews_count ? ` (${host.reviews_count})` : ''}` : ''}
          </p>

          {summary && <p className="pdp-lead">{summary}</p>}
          {description && <p className="pdp-desc">{description}</p>}

          <div className="pdp-facts">
            {durationMinutes ? (
              <div className="fact"><div className="fact-l">Duration</div><div className="fact-v">{durationMinutes} min</div></div>
            ) : null}
            {venue?.suburb ? (
              <div className="fact"><div className="fact-l">Location</div><div className="fact-v">{venue.suburb}</div></div>
            ) : null}
            {category ? (
              <div className="fact"><div className="fact-l">Category</div><div className="fact-v">{category.name}</div></div>
            ) : null}
            <div className="fact"><div className="fact-l">Sessions</div><div className="fact-v">{upcoming.length} upcoming</div></div>
          </div>

          {host && (
            <section className="pdp-section">
              <h2>Hosted by</h2>
              <div className="host-card">
                <div className="host-av">{initials}</div>
                <div className="host-info">
                  <div className="host-name">{host.name}</div>
                  {rating ? (
                    <div className="host-stats">★ {rating.toFixed(1)} · {host.reviews_count} reviews</div>
                  ) : null}
                  {host.bio ? <p className="host-bio">{host.bio}</p> : null}
                </div>
              </div>
            </section>
          )}

          {venue && (
            <section className="pdp-section">
              <h2>Where</h2>
              <div className="loc-card">
                <div className="loc-name">{venue.name}</div>
                <div className="loc-addr">{[venue.suburb, venue.city].filter(Boolean).join(', ')}</div>
              </div>
            </section>
          )}

          <section className="pdp-section">
            <h2>All sessions</h2>
            <ul className="session-list">
              {upcoming.length ? upcoming.map((s) => (
                <li key={s.id} className="session-row">
                  <span className="session-date">{formatDate(s.starts_at)}</span>
                  <span className="session-seats">{s.seats_remaining} spots left</span>
                </li>
              )) : <li className="session-row">No upcoming sessions scheduled.</li>}
            </ul>
          </section>
        </div>

        <aside className="pdp-aside">
          <BookingPanel sessions={upcoming} ticketTypes={ticketTypes} fromPrice={fromPrice} />
        </aside>
      </div>

      <div className="mobile-cta">
        <div className="mobile-cta-price">
          {fromPrice === 0 ? <strong>Free</strong> : <>from <strong>{formatPrice(fromPrice)}</strong></>}
        </div>
        <a href="#book" className="mobile-cta-btn">Select tickets</a>
      </div>
    </main>
  );
}
