"use client";

import CustomModal from "@/components/CustomModal";
import { RightArrowIcon } from "@/components/icons";
import useAuthHandlers from "@/hooks/useAuthHandlers";
import { NextUIButtonRadius, NextUIButtonSize } from "@/types";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { useDisclosure } from "@nextui-org/modal";
import { Spinner } from "@nextui-org/spinner";
import NextLink from "next/link";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import OAuthClientForm from "../../components/OAuthClientForm";
import { useRouter } from "next/navigation";

interface Inputs {
  email: string;
}

const placement = "outside";

const buttonRadius: NextUIButtonRadius = "full";
const buttonSize: NextUIButtonSize = undefined;

const ForgotPassClientForm = () => {
  const {
    forgotPassHandler,
    loading,
    error: submitError,
    actionSuccess,
    clearActionSuccess,
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
    },
  });

  const router = useRouter();

  const onSubmit: SubmitHandler<Inputs> = async ({ email }) => {
    console.log("onSubmit : ", { email });
    await forgotPassHandler(email);
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
        message={actionSuccess ? "Reset email sent" : submitError?.message}
        description={
          actionSuccess
            ? "Check your email to find the reset email and follow the instructions and then later sign in with that password."
            : submitError?.description
        }
        actionFn={actionSuccess ? redirectAction : clearSubmitError}
      />

      <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-5">
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
          Send Password Reset Email{" "}
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

export default ForgotPassClientForm;
