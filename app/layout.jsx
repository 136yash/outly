import './globals.css';

export const metadata = {
  title: 'Outly — Brisbane events & experiences',
  description:
    'The best nights out and hands-on days in Brisbane, in one place. Launching soon.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
