import type { Metadata } from "next";
import { Inter } from "next/font/google";

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
        {/* Preload critical SVGs */}
        <link rel="preload" href="/footer-grid.svg" as="image" type="image/svg+xml" />
        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
      </head>
      <body className={inter.className}>
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