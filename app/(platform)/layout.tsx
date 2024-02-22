import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

// Only authenticated users can access this.
export default async function PlatformLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  if (!session) {
    return redirect("/signin");
  }

  return (
    <section className="p-2 lg:p-6 flex flex-col h-full">
      {session ? children : null}
    </section>
  );
}
