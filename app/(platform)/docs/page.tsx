import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { subtitle, title } from "@/components/primitives";
import { getServerSession } from "next-auth";
// import { signOut, } from "next-auth/react";

export default async function DocsPage() {
  //   const session = useSession({
  //     required: true,
  //   });

  const session = await getServerSession(authOptions);
  console.log(session);

  return (
    <div>
      <h1 className={title()}>Docs. server side</h1>
      <div className={subtitle()}>{session?.user?.email}</div>
      {/* <button className="text-white" onClick={() => signOut()}>
        Logout
      </button> */}
    </div>
  );
}

DocsPage.requireAuth = true;
