import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AI Music Studio -- Audio to MIDI & Yamaha Style Converter',
  description: 'AI Music Studio converts audio tracks to editable multi-track MIDI and produces authentic Yamaha PSR-S970 style (.STY) files.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-[#07080c] text-slate-100 antialiased selection:bg-purple-600 selection:text-white">
        {children}
      </body>
    </html>
  );
}
