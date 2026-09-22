import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/layout/ThemeProvider';
import { AuthProvider } from '@/components/auth/AuthContext';
import { Navbar } from '@/components/layout/Navbar';
import { ScoreTicker } from '@/components/dashboard/ScoreTicker';
import { Footer } from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'StatsEdge Pro | Professional Sports Analytics Platform',
  description: 'Real-time sports data intelligence, AI win probability models, box scores, and combat sports analytics for NBA, NFL, MLB, MLS, NHL, Boxing, and MMA.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen flex flex-col bg-slate-950 text-slate-100 antialiased selection:bg-cyan-500 selection:text-slate-950">
        <ThemeProvider>
          <AuthProvider>
            <Navbar />
            <ScoreTicker />
            <div className="flex-1 flex flex-col">
              {children}
            </div>
            <Footer />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
