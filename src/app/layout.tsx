
"use client"; 

import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { MarkerDataProvider } from '@/contexts/marker-data-context';
import { SidebarProvider } from '@/components/ui/sidebar';
import { ThemeProvider } from '@/contexts/theme-provider'; // Added ThemeProvider import

// Define constants for Geist fonts
const geistSans = GeistSans;
const geistMono = GeistMono;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Removed the old useEffect for theme switching here

  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}>
        <ThemeProvider defaultTheme="system" storageKey="ohuhuHarmony-ui-theme">
          <MarkerDataProvider>
            <SidebarProvider defaultOpen={true}>
              {children}
              <Toaster />
            </SidebarProvider>
          </MarkerDataProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
