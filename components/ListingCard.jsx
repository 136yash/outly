import Link from 'next/link';
import { formatDate, fromLabel } from '../lib/format';

export default function ListingCard({ listing }) {
  const { slug, title, image, category, host, venue, nextSession, fromPrice } = listing;
  return (
    <Link href={`/e/${slug}`} className="card">
      <div className="card-img" style={{ backgroundImage: `url(${image})` }}>
        {category && (
          <span className="card-cat">
            <span aria-hidden="true">{category.emoji}</span> {category.name}
          </span>
        )}
      </div>
      <div className="card-body">
        <h3 className="card-title">{title}</h3>
        <p className="card-meta">
          {host?.name}
          {venue?.suburb ? ` · ${venue.suburb}` : ''}
        </p>
        <div className="card-foot">
          <span className="card-date">{nextSession ? formatDate(nextSession.starts_at) : ''}</span>
          <span className="card-price">{fromLabel(fromPrice)}</span>
        </div>
      </div>
    </Link>
  );
}
