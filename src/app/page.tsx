import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import ProgramSection from "../components/ProgramSection";
import LatestArticles from "../components/LatestArticles";
import SponsorsSection from "../components/SponsorsSection";
import Footer from "../components/Footer";

export const metadata = {
  title: "BEM FAI UNWAHA â€” Beranda",
  description: "Badan Eksekutif Mahasiswa Fakultas Agama Islam Universitas KH. A. Wahab Hasbullah Jombang.",
};

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F9F8FD]">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <ProgramSection previewMode />
        <LatestArticles previewMode />
        <SponsorsSection />
      </main>
      <Footer />
    </div>
  );
}

