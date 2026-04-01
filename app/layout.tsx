import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Vacation Star Tracker',
  description: 'Emerson & Avery\'s vacation star tracker',
  openGraph: {
    title: '★ VACATION STAR TRACKER ★',
    description: 'Emerson & Avery\'s vacation star tracker',
    url: 'https://star-tracker-two.vercel.app',
    siteName: 'Vacation Star Tracker',
    images: [{ url: '/opengraph-image', width: 1200, height: 630 }],
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
