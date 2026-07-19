import { Metadata } from "next";
import KemenbirsanContent from "./KemenbirsanContent";

export const metadata: Metadata = {
  title: "Kemenbirsan — BEM FAI UNWAHA",
  description: "Profil Presiden dan Wakil Presiden BEM FAI Universitas KH. A. Wahab Hasbullah Jombang.",
};

export default function KemenbirsanPage() {
  return <KemenbirsanContent />;
}
