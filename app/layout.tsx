import type { Metadata } from 'next';
import './globals.css';
import FirebaseAnalytics from '@/src/components/FirebaseAnalytics';

export const metadata: Metadata = {
  title: 'Soul Viva | Transparent Glycerin Bathing Bars',
  description: 'Premium Indian export partner for custom, transparent glycerin-rich gel bars and personal care products by Belleaves Private Limited.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <FirebaseAnalytics />
        {children}
      </body>
    </html>
  );
}

