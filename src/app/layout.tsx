import type { Metadata, Viewport } from 'next';
import './globals.css';
import { PwaProvider } from '@/components/pwa/PwaProvider';

export const metadata: Metadata = {
  title: 'AI Music Studio — Audio to MIDI & Yamaha Style Converter',
  description: 'AI Music Studio converts audio tracks to editable multi-track MIDI and produces authentic Yamaha PSR-S970 style (.STY) files.',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'AI Music Studio',
  },
  icons: {
    icon: '/icons/icon-192.svg',
    apple: '/icons/icon-192.svg',
  },
};

export const viewport: Viewport = {
  themeColor: '#0a0c13',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-touch-fullscreen" content="yes" />
      </head>
      <body className="min-h-screen bg-[#07080c] text-slate-100 antialiased selection:bg-purple-600 selection:text-white overscroll-none pb-[safe-area-inset-bottom]">
        {children}
        <PwaProvider />
      </body>
    </html>
  );
}
