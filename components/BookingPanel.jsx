'use client';

import { useState } from 'react';
import { formatPrice, formatDate } from '../lib/format';

export default function BookingPanel({ sessions, ticketTypes, fromPrice }) {
  const [sessionId, setSessionId] = useState(sessions[0]?.id || '');
  const [qty, setQty] = useState({});

  const selected = sessions.find((s) => s.id === sessionId) || sessions[0] || null;

  function setCount(name, delta) {
    setQty((q) => ({ ...q, [name]: Math.max(0, (q[name] || 0) + delta) }));
  }

  const total = ticketTypes.reduce((sum, t) => sum + (qty[t.name] || 0) * t.price_cents, 0);
  const count = ticketTypes.reduce((sum, t) => sum + (qty[t.name] || 0), 0);
  const totalLabel = total === 0 ? '$0' : formatPrice(total);

  return (
    <div className="book-card" id="book">
      <div className="book-from">
        {fromPrice === 0 ? <strong>Free</strong> : <>from <strong>{formatPrice(fromPrice)}</strong></>}
      </div>

      {sessions.length > 0 && (
        <label className="book-field">
          <span>Choose a date</span>
          <select value={sessionId} onChange={(e) => setSessionId(e.target.value)}>
            {sessions.map((s) => (
              <option key={s.id} value={s.id}>{formatDate(s.starts_at)}</option>
            ))}
          </select>
        </label>
      )}

      {selected && (
        <p className="book-seats">{selected.seats_remaining} spots left for this date</p>
      )}

      <div className="book-tickets">
        {ticketTypes.map((t) => (
          <div key={t.name} className="ticket-opt">
            <div>
              <div className="ticket-opt-name">{t.name}</div>
              <div className="ticket-opt-price">{formatPrice(t.price_cents)}</div>
            </div>
            <div className="stepper">
              <button
                onClick={() => setCount(t.name, -1)}
                aria-label={`Remove one ${t.name}`}
                disabled={(qty[t.name] || 0) === 0}
              >−</button>
              <span>{qty[t.name] || 0}</span>
              <button onClick={() => setCount(t.name, 1)} aria-label={`Add one ${t.name}`}>+</button>
            </div>
          </div>
        ))}
      </div>

      <div className="book-total">
        <span>Total{count ? ` · ${count} ${count === 1 ? 'ticket' : 'tickets'}` : ''}</span>
        <span className="book-total-amt">{totalLabel}</span>
      </div>

      <button className="book-btn" disabled>Book — opens in Phase 3</button>
      <p className="book-note">You won&apos;t be charged yet. Secure checkout arrives in Phase 3.</p>
    </div>
  );
}
