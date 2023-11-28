import React from "react";

const AuthFormLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="h-full">
      <div className="h-full flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
        <div className="w-full md:mt-0 sm:max-w-md xl:p-0">
              {children}
           </div>
      </div>
    </section>
  );
};

export default AuthFormLayout;
