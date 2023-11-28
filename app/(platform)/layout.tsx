import { getServerSession } from "next-auth";
// import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

// Only authenticated users can access this.
export default async function PlatformLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const session = useSession({
  //   required: true,
  //   onUnauthenticated() {
  //     redirect("/signin");
  //   },
  // });

  const session = await getServerSession();

  if (!session) {
    return redirect("/signin");
  }

  return <section>{session ? children : null}</section>;
}
