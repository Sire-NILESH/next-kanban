import { title } from "@/components/primitives";
import SignUpClientForm from "./components/sign-up-form";

const SignUpPage = () => {
  return (
    <div className="space-y-4 md:space-y-8">
      <div>
        <h1 className={title()}>Sign up</h1>
        <p className={"!mt-2 text-sm font-light text-default-700"}>
          Hey, create a free account to get started.
        </p>
      </div>

      <SignUpClientForm />
    </div>
  );
};

export default SignUpPage;
