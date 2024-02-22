import Sidebar from "@/components/sidebar/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="h-full bg-content2 flex items-stretch mt-10 rounded-lg overflow-hidden">
      <Sidebar />

      <div className="h-full w-full inline-block p-4">{children}</div>
    </section>
  );
}
