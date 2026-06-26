import { createClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = url && key ? createClient(url, key) : null;

function one(rel) {
  if (Array.isArray(rel)) return rel[0] || null;
  return rel || null;
}

function shapeListing(l) {
  if (!l) return null;
  const now = Date.now();
  const upcoming = (l.sessions || [])
    .filter((s) => new Date(s.starts_at).getTime() > now)
    .sort((a, b) => new Date(a.starts_at) - new Date(b.starts_at));
  const prices = (l.ticket_types || []).map((t) => t.price_cents);
  const fromPrice = prices.length ? Math.min(...prices) : null;
  const host = one(l.hosts);
  if (host && host.rating != null) host.rating = Number(host.rating);
  return {
    id: l.id,
    slug: l.slug,
    title: l.title,
    summary: l.summary,
    description: l.description,
    type: l.type,
    image: l.hero_image_url,
    durationMinutes: l.duration_minutes,
    isGiftable: l.is_giftable,
    category: one(l.categories),
    host,
    venue: one(l.venues),
    nextSession: upcoming[0] || null,
    upcoming,
    fromPrice,
    ticketTypes: l.ticket_types || [],
  };
}

const SELECT = `
  id, slug, title, summary, description, type, hero_image_url, duration_minutes, is_giftable,
  categories ( name, slug, emoji ),
  hosts ( name, slug, bio, rating, reviews_count ),
  venues ( name, suburb, city, address ),
  sessions ( id, starts_at, ends_at, capacity, seats_remaining ),
  ticket_types ( name, price_cents )
`;

export async function getCategories() {
  if (!supabase) return [];
  const { data, error } = await supabase.from('categories').select('*').order('name');
  if (error) { console.error('getCategories', error); return []; }
  return data || [];
}

export async function getCategoryBySlug(slug) {
  if (!supabase) return null;
  const { data } = await supabase.from('categories').select('*').eq('slug', slug).maybeSingle();
  return data || null;
}

export async function getListings({ categorySlug } = {}) {
  if (!supabase) return [];
  let query = supabase.from('listings').select(SELECT).eq('status', 'published');
  if (categorySlug) {
    const cat = await getCategoryBySlug(categorySlug);
    if (!cat) return [];
    query = query.eq('category_id', cat.id);
  }
  const { data, error } = await query;
  if (error) { console.error('getListings', error); return []; }
  const shaped = (data || []).map(shapeListing).filter((l) => l && l.nextSession);
  shaped.sort((a, b) => new Date(a.nextSession.starts_at) - new Date(b.nextSession.starts_at));
  return shaped;
}

export async function getListingBySlug(slug) {
  if (!supabase) return null;
  const { data, error } = await supabase.from('listings').select(SELECT).eq('slug', slug).maybeSingle();
  if (error) { console.error('getListingBySlug', error); return null; }
  return shapeListing(data);
}
