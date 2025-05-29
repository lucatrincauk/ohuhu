
"use client"; // Add this directive

import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { MarkerDataProvider } from '@/contexts/marker-data-context';
import { SidebarProvider } from '@/components/ui/sidebar'; // Corrected import path
import { useEffect } from 'react';

const geistSans = GeistSans;
const geistMono = GeistMono;

// Removed metadata export as it's not allowed in Client Components
// export const metadata: Metadata = {
//   title: 'Ohuhu Harmony',
//   description: 'Catalog your Ohuhu markers and find color inspirations.',
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = () => {
      if (mediaQuery.matches) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    };

    // Set initial theme
    handleChange();

    // Listen for changes
    mediaQuery.addEventListener('change', handleChange);

    // Cleanup listener on unmount
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  return (
    <html lang="en" suppressHydrationWarning> {/* Added suppressHydrationWarning for theme persistence */}
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}>
        <MarkerDataProvider>
          <SidebarProvider defaultOpen={true}>
            {children}
            <Toaster />
          </SidebarProvider>
        </MarkerDataProvider>
      </body>
    </html>
  );
}
