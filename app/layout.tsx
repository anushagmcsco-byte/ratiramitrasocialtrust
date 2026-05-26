import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { DonationProvider } from '@/lib/donation-context';
import Header from '@/components/header';
import Footer from '@/components/footer';
import SmartMitraBot from '@/components/smart-mitra-bot';
import DonationModal from '@/components/donation-modal';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: 'Raita Mitra Social Trust (R) - Farmer & Rural Empowerment NGO',
  description: 'Register charitable crowdfunding and empowerment platform for farmers, women SHGs, and youth across Karnataka. Approved under 80G tax exemption.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} scroll-smooth`}>
      <body className="font-sans antialiased text-slate-800 bg-slate-50 min-h-screen flex flex-col" suppressHydrationWarning>
        <DonationProvider>
          <Header />
          <main className="flex-grow flex flex-col">
            {children}
          </main>
          <Footer />
          <SmartMitraBot />
          <DonationModal />
        </DonationProvider>
      </body>
    </html>
  );
}
