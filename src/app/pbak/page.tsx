import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import PbakContent from "./PbakContent";

export const metadata = {
  title: "PBAK FAI UNWAHA 2026 — Pengenalan Budaya Akademik",
  description: "Portal resmi PBAK / PKKMB Fakultas Agama Islam Universitas KH. A. Wahab Hasbullah.",
};

export default function PbakPage() {
  return (
    <div className="min-h-screen flex flex-col bg-transparent">
      <Navbar />
      <main className="flex-grow pt-16">
        <PbakContent />
      </main>
      <Footer />
    </div>
  );
}
