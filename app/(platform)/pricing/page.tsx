"use client";

import { title, subtitle } from "@/components/primitives";
import { ShadCnBtn } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";

export default function PricingPage() {
  const session = useSession({
    required: true,
  });

  return (
    <div className="space-y-4">
      <h1 className={title()}>Pricing, client side</h1>
      <p className={subtitle()}>{session?.data?.user?.email}</p>

      <ShadCnBtn type="submit" onClick={() => signOut()}>
        Logout
      </ShadCnBtn>
    </div>
  );
}
