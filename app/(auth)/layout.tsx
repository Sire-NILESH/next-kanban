import React from "react";
import { AuthNavbar } from "./components/auth-navbar";

const AuthFormLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <AuthNavbar />

      <section className="container h-full lg:mt-24 py-8 lg:py-0 flex flex-col items-center">
        <div className="sm:max-w-md">{children}</div>
      </section>
    </div>
  );
};

export default AuthFormLayout;
