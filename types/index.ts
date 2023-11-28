import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type NextUIButtonRadius =
  | "full"
  | "sm"
  | "md"
  | "lg"
  | "none"
  | undefined;

export type NextUIButtonSize = "md" | "sm" | "lg" | undefined;

export interface AuthCustomError {
  errorType: string;
  message: string;
  description: string;
}

// "Firebase auth createUserWithEmailAndPassword Error"
// "Firebase: Error (auth/invalid-login-credentials)."
