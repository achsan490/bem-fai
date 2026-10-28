export const metadata = {
  title: "Portal Administrasi — BEM FAI UNWAHA",
  description: "Dashboard Administrasi BEM FAI Universitas KH. A. Wahab Hasbullah",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-screen bg-[#180206] text-[#FDF7F8]">{children}</div>;
}
