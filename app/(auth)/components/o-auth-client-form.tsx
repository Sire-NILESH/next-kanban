"use client";

import { FacebookColoredIcon, GoogleIcon } from "@/components/icons";
import { NextUIButtonRadius, NextUIButtonSize } from "@/types";
import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/divider";
import React from "react";
import useAuthHandlers from "@/hooks/useAuthHandlers";

const buttonRadius: NextUIButtonRadius = "full";
const buttonSize: NextUIButtonSize = undefined;

const OAuthClientForm = () => {

  const { signinWithGoogleHandler } = useAuthHandlers();

  return (
    <>
      {/* Divider */}
      <div className="flex items-center">
        <Divider className="flex-1 mx-4" />
        <span className="text-default-600 text-sm">OR</span>
        <Divider className="flex-1 mx-4" />
      </div>

      {/* OAUth logins */}
      <div className="mt-4 space-y-3">
        <Button
          color="default"
          size={buttonSize}
          fullWidth
          variant="ghost"
          radius={buttonRadius}
          onPress={signinWithGoogleHandler}
          startContent={<GoogleIcon className="h-5 w-5" />}
        >
          Sign in with Google
        </Button>
        <Button
          color="default"
          size={buttonSize}
          fullWidth
          variant="ghost"
          radius={buttonRadius}
          // onPress={onClickHandler}
          isDisabled
          startContent={<FacebookColoredIcon className="h-5 w-5" />}
        >
          Sign in with Facebook
        </Button>
      </div>
    </>
  );
};

export default OAuthClientForm;
