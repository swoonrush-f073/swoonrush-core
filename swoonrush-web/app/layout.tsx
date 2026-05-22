import type { Metadata } from 'next';
import { Inter, Playfair_Display, Raleway } from 'next/font/google';

import GAWrapper from '@/components/GAWrapper';

import './globals.css';

import Footer from '@/components/Footer';
import SwoonRushNavbar from '@/components/Navbar';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const raleway = Raleway({
  subsets: ['latin'],
  variable: '--font-raleway',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'SwoonRush | Wear Your Drama Obsession',
  description: 'Trendy, aesthetic and made for every Drama lover.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${raleway.variable} ${playfair.variable} ${inter.variable}`}
    >
      <GAWrapper />
      <body
        className="font-sans antialiased relative max-h-screen overflow-x-hidden overflow-y-hidden"
        suppressHydrationWarning
      >
        <SwoonRushNavbar />
        <main className="max-h-screen overflow-x-hidden overflow-y-scroll">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
