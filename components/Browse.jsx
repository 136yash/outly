'use client';

import { useMemo, useState } from 'react';
import ListingCard from './ListingCard';

function inWindow(upcoming, when) {
  if (when === 'any') return true;
  const now = new Date();
  return (upcoming || []).some((s) => {
    const d = new Date(s.starts_at);
    const diffDays = (d - now) / 86400000;
    if (diffDays < 0) return false;
    if (when === 'today') return d.toDateString() === now.toDateString();
    if (when === 'weekend') {
      const day = d.getDay(); // 0 = Sun, 6 = Sat
      return diffDays <= 14 && (day === 0 || day === 6);
    }
    if (when === 'week') return diffDays <= 7;
    return true;
  });
}

function matchPrice(fromPrice, price) {
  if (price === 'any') return true;
  if (fromPrice == null) return false;
  if (price === 'free') return fromPrice === 0;
  if (price === 'under50') return fromPrice < 5000;
  if (price === '50plus') return fromPrice >= 5000;
  return true;
}

export default function Browse({ listings, categories }) {
  const [q, setQ] = useState('');
  const [cat, setCat] = useState('all');
  const [when, setWhen] = useState('any');
  const [price, setPrice] = useState('any');

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return listings.filter((l) => {
      if (cat !== 'all' && l.category?.slug !== cat) return false;
      if (!inWindow(l.upcoming, when)) return false;
      if (!matchPrice(l.fromPrice, price)) return false;
      if (needle) {
        const hay = [l.title, l.host?.name, l.category?.name, l.venue?.suburb]
          .filter(Boolean)
          .join(' ')
          .toLowerCase();
        if (!hay.includes(needle)) return false;
      }
      return true;
    });
  }, [listings, q, cat, when, price]);

  const active = cat !== 'all' || when !== 'any' || price !== 'any' || q.trim() !== '';

  function clearAll() {
    setQ('');
    setCat('all');
    setWhen('any');
    setPrice('any');
  }

  return (
    <div>
      <div className="filter-bar">
        <div className="search-field">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="7" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search events and experiences…"
            aria-label="Search"
          />
        </div>

        <div className="cat-chip-row">
          <button
            className={`cat-chip ${cat === 'all' ? 'on' : ''}`}
            onClick={() => setCat('all')}
          >
            All
          </button>
          {categories.map((c) => (
            <button
              key={c.slug}
              className={`cat-chip ${cat === c.slug ? 'on' : ''}`}
              onClick={() => setCat(cat === c.slug ? 'all' : c.slug)}
            >
              <span className="cat-emoji" aria-hidden="true">{c.emoji}</span> {c.name}
            </button>
          ))}
        </div>

        <div className="filter-row">
          <label className="filter-select">
            When
            <select value={when} onChange={(e) => setWhen(e.target.value)}>
              <option value="any">Anytime</option>
              <option value="today">Today</option>
              <option value="weekend">This weekend</option>
              <option value="week">Next 7 days</option>
            </select>
          </label>
          <label className="filter-select">
            Price
            <select value={price} onChange={(e) => setPrice(e.target.value)}>
              <option value="any">Any price</option>
              <option value="free">Free</option>
              <option value="under50">Under $50</option>
              <option value="50plus">$50+</option>
            </select>
          </label>
          <div className="results-head">
            <span>{filtered.length} {filtered.length === 1 ? 'result' : 'results'}</span>
            {active && (
              <button className="clear-btn" onClick={clearAll}>Clear all</button>
            )}
          </div>
        </div>
      </div>

      {filtered.length > 0 ? (
        <div className="listing-grid">
          {filtered.map((l) => (
            <ListingCard key={l.id} listing={l} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <p className="empty-title">No matches</p>
          <p>Try clearing a filter or searching for something else.</p>
        </div>
      )}
    </div>
  );
}
