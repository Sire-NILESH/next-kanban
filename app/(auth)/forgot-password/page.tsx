import { title } from "@/components/primitives";
import ForgotPassClientForm from "./components/ForgotPassClientForm";

const ForgotPassPage = () => {
  return (
    <div className="p-6 space-y-4 md:space-y-8 sm:p-2">
      <div>
        <h1 className={title()}>Forgot Password?</h1>
        <p className={"!mt-2 text-sm font-light text-default-700"}>
          Hey, reset your password to recover your account.
        </p>
      </div>

      <ForgotPassClientForm />
    </div>
  );
};

export default ForgotPassPage;
