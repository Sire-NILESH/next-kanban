import UserAvatar from "@/components/user-avatar";
import { title } from "@/components/primitives";
import { ThemeSwitch } from "@/components/theme-switch";
import { Progress } from "@nextui-org/progress";

import React from "react";

const ProjectPageHeader = () => {
  return (
    <header className="px-2 pb-2 space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className={title({ size: "xs" })}>Project Macedonia</h2>

          <div className="">
            <Progress
              aria-label="Completed..."
              // label="Completed..."
              isStriped
              size="md"
              value={44}
              color="secondary"
              // showValueLabel={true}
              className="w-36 max-w-xs"
            />
          </div>
        </div>

        <div className="flex space-x-3">
          <ThemeSwitch />
          <UserAvatar />
        </div>
      </div>
    </header>
  );
};

export default ProjectPageHeader;
