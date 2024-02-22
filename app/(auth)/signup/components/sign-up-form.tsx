"use client";

import CustomModal from "@/components/custom-modal";
import { RightArrowIcon } from "@/components/icons";
import useAuthHandlers from "@/hooks/useAuthHandlers";
import { NextUIButtonRadius, NextUIButtonSize } from "@/types";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { useDisclosure } from "@nextui-org/modal";
import { Spinner } from "@nextui-org/spinner";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import OAuthClientForm from "../../components/o-auth-client-form";
import TogglePasswordVisibilityBtn from "../../components/toggle-password-visibility-btn";

interface Inputs {
  email: string;
  password: string;
  confirmPassword: string;
}

const requiredConstants = {
  minRequiredPasswordLength: 6,
  maxRequiredPasswordLength: 20,
  minRequiredNameLength: 2,
  maxRequiredNameLength: 2,
};

const placement = "outside";

const buttonRadius: NextUIButtonRadius = "full";
const buttonSize: NextUIButtonSize = undefined;

const SignUpClientForm = () => {
  const {
    signupHandler,
    loading,
    actionSuccess,
    error: submitError,
    clearError: clearSubmitError,
    clearActionSuccess,
  } = useAuthHandlers();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const [isVisible, setIsVisible] = useState(false);

  const router = useRouter();

  const toggleVisibility = () => setIsVisible(!isVisible);

  const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
    console.log("onSubmit : ", { email, password });
    await signupHandler(email, password);
    reset();
  };

  // Modal controls
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    if (submitError || actionSuccess) {
      onOpen();
    }
    // eslint-disable-next-line
  }, [submitError, actionSuccess]);

  function redirectAction() {
    clearActionSuccess();
    router.push("/signin");
  }

  return (
    <>
      <CustomModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        message={
          actionSuccess ? "Account created successfully" : submitError?.message
        }
        description={
          actionSuccess
            ? "Now redirecting you to Signin page for you to signin with this new account."
            : submitError?.description
        }
        actionFn={actionSuccess ? redirectAction : clearSubmitError}
      />
      <form
        onSubmit={handleSubmit(onSubmit)}
        // onSubmit={(e) => {
        //   e.preventDefault();
        //   return handleSubmit(onSubmit);
        // }}
        className="w-full space-y-5"
      >
        <Input
          size={"md"}
          fullWidth
          isClearable
          isRequired
          className="text-default-700"
          type="email"
          label="Email"
          labelPlacement={placement}
          placeholder="yourname@example.com"
          errorMessage={
            errors.email
              ? errors.email.type === "pattern"
                ? "Enter a valid email"
                : "Email is required"
              : undefined
          }
          isInvalid={errors.email ? true : false}
          {...register("email", {
            required: true,
            pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i,
          })}
        />

        <Input
          size={"md"}
          fullWidth
          isClearable
          isRequired
          className="text-default-700"
          type={isVisible ? "text" : "password"}
          label={"Password"}
          labelPlacement={placement}
          placeholder="••••"
          errorMessage={
            errors.password
              ? errors.password.type === "minLength"
                ? `Password must be at least ${requiredConstants.minRequiredPasswordLength} characters long`
                : errors.password.type === "maxLength"
                ? `Password must be at most ${requiredConstants.maxRequiredPasswordLength} characters long`
                : "Password is required"
              : undefined
          }
          {...register("password", {
            required: true,
            minLength: requiredConstants.minRequiredPasswordLength,
            maxLength: requiredConstants.maxRequiredPasswordLength,
          })}
        />

        <Input
          size={"md"}
          fullWidth
          isClearable
          isRequired
          className="text-default-700"
          type={isVisible ? "text" : "password"}
          label={"Confirm Password"}
          labelPlacement={placement}
          placeholder="••••"
          errorMessage={
            errors.confirmPassword
              ? errors.confirmPassword.type === "minLength"
                ? `Password must be at least ${requiredConstants.minRequiredPasswordLength} characters long`
                : errors.confirmPassword.type === "maxLength"
                ? `Password must be at most ${requiredConstants.maxRequiredPasswordLength} characters long`
                : errors.confirmPassword.type === "validate"
                ? errors.confirmPassword.message
                : "Confirm your password"
              : undefined
          }
          {...register("confirmPassword", {
            required: true,
            minLength: requiredConstants.minRequiredPasswordLength,
            maxLength: requiredConstants.maxRequiredPasswordLength,
            validate: (value) =>
              value === watch("password") || "Passwords do not match",
          })}
        />

        <div className="!mb-8 flex justify-between items-center">
          {/* Show/hide passwords button */}
          <TogglePasswordVisibilityBtn
            isPasswordsVisible={isVisible}
            onClickHandler={toggleVisibility}
          />
        </div>

        <Button
          color="secondary"
          size={buttonSize}
          fullWidth
          type="submit"
          radius={buttonRadius}
          endContent={
            loading ? (
              <Spinner size="sm" color="white" />
            ) : (
              <RightArrowIcon className="w-4" />
            )
          }
        >
          Create Account{" "}
        </Button>

        {/* All OAuth login Buttons */}
        <OAuthClientForm />
      </form>

      <p className="text-sm font-light text-default-500">
        {"Already have an account? "}{" "}
        <NextLink
          href="/signin"
          className="font-medium text-primary-600 hover:underline dark:text-primary-500"
        >
          Sign in
        </NextLink>
      </p>
    </>
  );
};

export default SignUpClientForm;
