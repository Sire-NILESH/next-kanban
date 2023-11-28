import { EyeFilledIcon, EyeSlashFilledIcon } from "@/components/icons";
import { Button } from "@nextui-org/button";
import { Eye, EyeOff } from "lucide-react";
import React from "react";

const TogglePasswordVisibilityBtn = ({
  isPasswordsVisible,
  onClickHandler,
}: {
  isPasswordsVisible: boolean;
  onClickHandler: () => void;
}) => {
  return (
    <Button
      variant="light"
      size="sm"
      onClick={onClickHandler}
      startContent={
        isPasswordsVisible ? (
          <EyeOff className="h-5 w-5 text-default-500 pointer-events-none" />
        ) : (
          <Eye className="h-5 w-5 text-default-500 pointer-events-none" />
        )
      }
    >
      <p className="text-default-500 text-sm">
        {isPasswordsVisible ? "Hide Passwords" : "Show Passwords"}
      </p>
    </Button>
    //  <Button
    //    variant="light"
    //    size="sm"
    //    onClick={onClickHandler}
    //    startContent={
    //       isPasswordsVisible ? (
    //        <EyeSlashFilledIcon className="h-5 w-5 text-default-500 pointer-events-none" />
    //      ) : (
    //        <EyeFilledIcon className="h-5 w-5 text-default-500 pointer-events-none" />
    //      )
    //    }
    //  >
    //    <p className="text-default-500 text-sm">
    //      {isPasswordsVisible ? "Hide Passwords" : "Show Passwords"}
    //    </p>
    //  </Button>
  );
};

export default TogglePasswordVisibilityBtn;
