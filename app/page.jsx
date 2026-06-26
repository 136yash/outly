import { getCategories, getListings } from '../lib/supabase';
import Browse from '../components/Browse';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const [categories, listings] = await Promise.all([getCategories(), getListings()]);

  return (
    <main>
      <section className="hero-band">
        <div className="container">
          <p className="hero-eyebrow">What&apos;s on in Brisbane</p>
          <h1 className="hero-h1">
            Find your next night out — and your next <em>hands-on day.</em>
          </h1>
          <p className="hero-sub">
            Comedy, live music, pottery, cooking, cocktails and more. Tickets and
            experiences, all in one place.
          </p>
        </div>
      </section>

      <section className="container section">
        {listings.length > 0 ? (
          <Browse listings={listings} categories={categories} />
        ) : (
          <div className="empty-state">
            <p className="empty-title">No listings showing yet</p>
            <p>
              If your database is seeded, this usually means the app can&apos;t reach
              Supabase. Check that <code>.env.local</code> has your
              <code> NEXT_PUBLIC_SUPABASE_URL</code> and
              <code> NEXT_PUBLIC_SUPABASE_ANON_KEY</code>, then restart
              <code> npm run dev</code>.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
