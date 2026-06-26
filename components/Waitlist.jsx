'use client';

import { useState } from 'react';

export default function Waitlist() {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (!email) return;
    // Phase 2: this will save to Supabase. For now it just confirms locally.
    setDone(true);
  }

  if (done) {
    return (
      <p className="thanks" role="status">
        You&apos;re on the list — we&apos;ll be in touch. 🎉
      </p>
    );
  }

  return (
    <form className="waitlist" onSubmit={handleSubmit}>
      <input
        type="email"
        required
        placeholder="your@email.com"
        aria-label="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit">Notify me</button>
    </form>
  );
}
