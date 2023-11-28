import { title } from "@/components/primitives";
import SignInClientForm from "./components/SignInClientForm";

const SignInPage = () => {
  return (
    <div className="p-6 space-y-4 md:space-y-8 sm:p-2">
      <div>
        <h1 className={title()}>Sign in</h1>
        <p className={"!mt-2 text-sm font-light text-default-700"}>
          Welcome back, sign in to access your work.
        </p>
      </div>

      <SignInClientForm />
    </div>
  );
};

export default SignInPage;
