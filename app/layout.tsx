import type { Metadata } from 'next';
import { Press_Start_2P } from 'next/font/google';
import './globals.css';

const pressStart2P = Press_Start_2P({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Star Tracker',
  description: 'Emerson & Avery\'s star tracker',
  openGraph: {
    title: '★ STAR TRACKER ★',
    description: 'Emerson & Avery\'s star tracker',
    url: 'https://star-tracker-two.vercel.app',
    siteName: 'Star Tracker',
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
    <html lang="en" className={pressStart2P.className}>
      <body>{children}</body>
    </html>
  );
}
