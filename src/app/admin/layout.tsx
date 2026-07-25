import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Portal - BEM FAI",
  description: "Portal Administrasi Badan Eksekutif Mahasiswa Fakultas Agama Islam.",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-transparent text-white font-sans flex flex-col">
      {children}
    </div>
  );
}

