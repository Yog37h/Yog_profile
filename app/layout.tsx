import type { Metadata } from "next";
import { Inter } from "next/font/google";

import PerformanceMonitor from "@/components/ui/PerformanceMonitor";
import "./globals.css";
import { ThemeProvider } from "./provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Yogesh Portfolio",
  description: "Yogesh's digital resume",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Website favicon */}
        <link rel="icon" href="/yog2.png" sizes="any" />
        {/* Preload critical images */}
        <link rel="preload" href="/tol1.avif" as="image" type="image/avif" />
        <link rel="preload" href="/tol2.avif" as="image" type="image/avif" />
        <link rel="preload" href="/tol3.avif" as="image" type="image/avif" />
        {/* Preload above-the-fold images */}
        <link rel="preload" href="/m2.avif" as="image" type="image/avif" />
        <link rel="preload" href="/ach2.avif" as="image" type="image/avif" />
        {/* Preload critical SVGs */}
        <link rel="preload" href="/footer-grid.svg" as="image" type="image/svg+xml" />
        {/* DNS prefetch and preconnect for external resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        {/* Additional resource hints */}
        <link rel="dns-prefetch" href="//netlify.app" />
        <link rel="dns-prefetch" href="//cdnjs.cloudflare.com" />
        {/* Preload critical fonts with font-display swap */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
        />
        {/* Critical CSS for LCP optimization */}
        <style dangerouslySetInnerHTML={{
          __html: `
            .hero-text-critical {
              font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              font-weight: 500;
              line-height: 1.5;
              color: white;
              opacity: 1;
              visibility: visible;
            }
            .hero-container {
              min-height: 100vh;
              display: flex;
              align-items: center;
              justify-content: center;
            }
            body {
              font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              background-color: #000118;
              color: white;
            }
          `
        }} />
      </head>
      <body className={inter.className}>
        <PerformanceMonitor />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}