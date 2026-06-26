export function formatPrice(cents) {
  if (cents == null) return '';
  if (cents === 0) return 'Free';
  return new Intl.NumberFormat('en-AU', {
    style: 'currency', currency: 'AUD', maximumFractionDigits: 0,
  }).format(cents / 100);
}

export function formatDate(iso) {
  if (!iso) return '';
  return new Intl.DateTimeFormat('en-AU', {
    weekday: 'short', day: 'numeric', month: 'short',
    hour: 'numeric', minute: '2-digit',
    timeZone: 'Australia/Brisbane',
  }).format(new Date(iso));
}

export function fromLabel(cents) {
  if (cents == null) return '';
  if (cents === 0) return 'Free';
  return 'from ' + formatPrice(cents);
}
