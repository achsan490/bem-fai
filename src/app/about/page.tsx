import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import AboutContent from "./AboutContent";

export const metadata = {
  title: "Tentang Kami — BEM FAI UNWAHA",
  description: "Profil, Visi, Misi, dan Sejarah Badan Eksekutif Mahasiswa Fakultas Agama Islam UNWAHA Jombang.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-transparent">
      <Navbar />
      <main className="flex-grow pt-16">
        <AboutContent />
      </main>
      <Footer />
    </div>
  );
}
