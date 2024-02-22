import { title } from "@/components/primitives";
import SignInClientForm from "./components/sign-in-form";

const SignInPage = () => {
  return (
    <div className="space-y-4 md:space-y-8">
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
