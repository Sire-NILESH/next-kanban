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
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import OAuthClientForm from "../../components/o-auth-client-form";
import TogglePasswordVisibilityBtn from "../../components/toggle-password-visibility-btn";

interface Inputs {
  email: string;
  password: string;
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

const SignInClientForm = () => {
  const {
    signinHandler,
    loading,
    error: submitError,
    clearError: clearSubmitError,
  } = useAuthHandlers();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
    console.log("onSubmit : ", { email, password });
    await signinHandler(email, password);
    reset();
  };

  // Modal controls
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    if (submitError) {
      onOpen();
    }
    // eslint-disable-next-line
  }, [submitError]);

  return (
    <>
      <CustomModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        message={submitError?.message}
        description={submitError?.description}
        actionFn={clearSubmitError}
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

        <div className="!mb-8 flex justify-between items-center">
          {/* Show/hide passwords button */}
          <TogglePasswordVisibilityBtn
            isPasswordsVisible={isVisible}
            onClickHandler={toggleVisibility}
          />

          <NextLink
            href="/forgot-password"
            className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
          >
            Forgot password?
          </NextLink>
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
          Get started{" "}
        </Button>

        {/* All OAuth login Buttons */}
        <OAuthClientForm />
      </form>

      <p className="text-sm font-light text-default-500">
        {"Don’t have an account yet? "}{" "}
        <NextLink
          href="/signup"
          className="font-medium text-primary-600 hover:underline dark:text-primary-500"
        >
          Sign up
        </NextLink>
      </p>
    </>
  );
};

export default SignInClientForm;
