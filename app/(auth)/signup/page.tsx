import { title } from "@/components/primitives";
import SignUpClientForm from "./components/SignUpClientForm";

const SignUpPage = () => {
  return (
    <div className="p-6 space-y-4 md:space-y-8 sm:p-2">
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
