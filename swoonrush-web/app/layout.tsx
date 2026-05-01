import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';

import './globals.css';

import Footer from '@/components/Footer';
import SwoonRushNavbar from '@/components/Navbar';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'SwoonRush | Wear Your K-Drama Obsession',
  description: 'Trendy, aesthetic and made for every K-Drama lover.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="antialiased" suppressHydrationWarning>
        <SwoonRushNavbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
