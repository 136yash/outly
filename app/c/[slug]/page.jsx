import Link from 'next/link';
import { getCategoryBySlug, getListings } from '../../../lib/supabase';
import ListingCard from '../../../components/ListingCard';

export const dynamic = 'force-dynamic';

export default async function CategoryPage({ params }) {
  const { slug } = params;
  const [category, listings] = await Promise.all([
    getCategoryBySlug(slug),
    getListings({ categorySlug: slug }),
  ]);

  return (
    <main className="container section">
      <Link href="/" className="back-link">← All categories</Link>
      <h1 className="page-h1">
        {category ? (
          <>
            <span aria-hidden="true">{category.emoji}</span> {category.name} in Brisbane
          </>
        ) : (
          'Category'
        )}
      </h1>
      <p className="page-count">{listings.length} {listings.length === 1 ? 'listing' : 'listings'}</p>

      {listings.length > 0 ? (
        <div className="listing-grid">
          {listings.map((l) => (
            <ListingCard key={l.id} listing={l} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <p className="empty-title">Nothing here yet</p>
          <p>No upcoming listings in this category right now.</p>
        </div>
      )}
    </main>
  );
}
