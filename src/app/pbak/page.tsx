import { Metadata } from "next";
import PbakContent from "./PbakContent";

export const metadata: Metadata = {
  title: "PBAK FAI UNWAHA 2026 — Laman Resmi Pengenalan Budaya Akademik & Kemahasiswaan",
  description:
    "Pusat informasi lengkap PBAK / PKKMB Fakultas Agama Islam Universitas KH. A. Wahab Hasbullah Jombang. Rundown acara, atribut dresscode, buku panduan, penugasan, dan twibbon mahasiswa baru.",
};

export default function PbakPage() {
  return <PbakContent />;
}
