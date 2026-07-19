import { Metadata } from "next";
import NewsContent from "./NewsContent";

export const metadata: Metadata = {
  title: "Berita & Artikel — BEM FAI UNWAHA",
  description: "Ikuti artikel, kajian akademik, dan berita terkini dari Badan Eksekutif Mahasiswa Fakultas Agama Islam UNWAHA Jombang.",
};

export default function NewsPage() {
  return <NewsContent />;
}
