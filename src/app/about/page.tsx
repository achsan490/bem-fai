import { Metadata } from "next";
import AboutContent from "./AboutContent";

export const metadata: Metadata = {
  title: "Tentang Kami — BEM FAI UNWAHA",
  description: "Visi, Misi, Deskripsi Fakultas Agama Islam, dan Filosofi Logo BEM FAI Universitas KH. A. Wahab Hasbullah Jombang.",
};

export default function AboutPage() {
  return <AboutContent />;
}
