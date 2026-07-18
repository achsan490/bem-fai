import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BEM FAI UNWAHA - Badan Eksekutif Mahasiswa Fakultas Agama Islam Universitas KH. A. Wahab Hasbullah",
  description: "Portal Resmi BEM Fakultas Agama Islam Universitas KH. A. Wahab Hasbullah (UNWAHA) Jombang. Wadah kolaborasi, kreasi, dan pengabdian mahasiswa berbasis nilai keislaman dan teknologi masa depan.",
  keywords: ["BEM FAI UNWAHA", "BEM FAI UNWAHA Jombang", "Fakultas Agama Islam UNWAHA", "UNWAHA", "Universitas KH. A. Wahab Hasbullah", "Futuristic Islamic", "Portal BEM"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${spaceGrotesk.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}

