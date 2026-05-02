import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import { AuthProvider } from '../components/AuthContext';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
});

export const metadata: Metadata = {
  title: 'Noida Kawadiwala & Scrap Dealer | Sell Old Appliances',
  description: 'Best scrap dealer in Noida, Delhi, NCR. Sell your old ACs, Fridges, Batteries, and Appliances for the best price.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body suppressHydrationWarning className="font-sans antialiased text-slate-900 bg-slate-50">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
