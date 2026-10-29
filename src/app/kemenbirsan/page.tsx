import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import KemenbirsanContent from "./KemenbirsanContent";

export const metadata = {
  title: "Kemenbirsan — BEM FAI UNWAHA",
  description: "Profil Gubernur dan Wakil Gubernur BEM FAI Universitas KH. A. Wahab Hasbullah Jombang.",
};

export default function KemenbirsanPage() {
  return (
    <div className="min-h-screen flex flex-col bg-transparent">
      <Navbar />
      <main className="flex-grow">
        <KemenbirsanContent />
      </main>
      <Footer />
    </div>
  );
}
