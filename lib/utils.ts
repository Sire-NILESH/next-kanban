import { AuthCustomError } from "@/types";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function customiseAuthError(
  error: any,
  email?: string
): AuthCustomError {
  let customError: AuthCustomError = {
    errorType: "Unknow Error",
    message: "Oops, something went wrong.",
    description:
      "We're sorry, but it looks like there was an error. Please try again later or contact support if the issue persists.",
  };

  console.log(error);

  switch (error) {
    case "Firebase: Error (auth/email-already-in-use).":
      customError = {
        errorType: "Firebase auth Error",
        message: "This email is already in use.",
        description: `We're sorry, but it looks like this email${
          email ? ` '${email}'` : ""
        }' is already associated with an account. Please try logging in or use a different email address to create a new account.`,
      } as AuthCustomError;

      break;

    case "Firebase: Error (auth/invalid-login-credentials)." ||
      "Firebase: Error (auth/invalid-email)." ||
      "Firebase: Error (auth/invalid-password)." ||
      "Firebase: Error (auth/invalid-display-name)." ||
      "Firebase: Error (auth/invalid-photo-url).":
      customError = {
        errorType: "Firebase auth Error",
        message: "Invalid credentials.",
        description:
          "We're sorry, but it looks like the credentials you entered is incorrect. Please double-check your credentials and try again.",
      } as AuthCustomError;

      break;
  }

  return customError;
}
