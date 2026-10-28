import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import NewsContent from "./NewsContent";

export const metadata = {
  title: "Kabar & Artikel — BEM FAI UNWAHA",
  description: "Rilis berita resmi, kajian dakwah, dan publikasi kegiatan mahasiswa Fakultas Agama Islam UNWAHA.",
};

export default function NewsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-transparent">
      <Navbar />
      <main className="flex-grow pt-16">
        <NewsContent />
      </main>
      <Footer />
    </div>
  );
}
