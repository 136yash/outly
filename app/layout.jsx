import './globals.css';
import SiteHeader from '../components/SiteHeader';

export const metadata = {
  title: 'Outly — Brisbane events & experiences',
  description:
    'Discover the best events and experiences in Brisbane — comedy, live music, pottery, cooking and more.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SiteHeader />
        {children}
        <footer className="site-footer">
          <div className="container">Outly · working preview · Brisbane</div>
        </footer>
      </body>
    </html>
  );
}
