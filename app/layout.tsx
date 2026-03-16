import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme/theme-provider';
import { Navbar } from '@/components/layout/navbar/navbar';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { Toaster } from 'sonner';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Collectanea',
  description: 'Create, track, and manage your lists effortlessly.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} bg-background antialiased`}>
        <NuqsAdapter>
          <ThemeProvider />
          {/* We keep the navbar here so it shows on every page */}
          <Navbar />
          <main>{children}</main>
          <Toaster position="bottom-right" theme="system" />
        </NuqsAdapter>
      </body>
    </html>
  );
}
