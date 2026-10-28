import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://bemfaiunwaha.ac.id"),
  title: "BEM FAI UNWAHA - Badan Eksekutif Mahasiswa Fakultas Agama Islam Universitas KH. A. Wahab Hasbullah",
  description: "Portal Resmi BEM Fakultas Agama Islam Universitas KH. A. Wahab Hasbullah (UNWAHA) Jombang. Wadah kolaborasi, kreasi, dan pengabdian mahasiswa berbasis nilai keislaman dan teknologi masa depan.",
  keywords: ["BEM FAI UNWAHA", "BEM FAI UNWAHA Jombang", "Fakultas Agama Islam UNWAHA", "UNWAHA", "Universitas KH. A. Wahab Hasbullah", "Futuristic Islamic", "Portal BEM"],
  icons: {
    icon: [
      { url: "/assets/logo.webp" },
      { url: "/favicon.ico" },
    ],
    shortcut: "/assets/logo.webp",
    apple: "/assets/logo.webp",
  },
  openGraph: {
    title: "BEM FAI UNWAHA — Kabinet Perunggu 2026",
    description: "Portal Resmi BEM Fakultas Agama Islam UNWAHA Jombang. Sinergi, Prestasi, dan Pengabdian.",
    url: "https://bemfaiunwaha.ac.id",
    siteName: "BEM FAI UNWAHA",
    images: [
      {
        url: "/assets/logo.webp",
        width: 512,
        height: 512,
        alt: "Logo BEM FAI UNWAHA",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "BEM FAI UNWAHA — Kabinet Perunggu 2026",
    description: "Portal Resmi BEM Fakultas Agama Islam UNWAHA Jombang.",
    images: ["/assets/logo.webp"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${spaceGrotesk.variable} ${inter.variable} h-full antialiased overflow-x-hidden`}
    >
      <head>
        <link
          rel="preload"
          as="image"
          href="/assets/gedung1.webp"
          type="image/webp"
          fetchPriority="high"
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground overflow-x-hidden w-full max-w-full">
        <div className="bg-site-ambient" aria-hidden="true" />
        <NextTopLoader color="#800020" showSpinner={false} height={3} />
        {children}
      </body>
    </html>
  );
}


