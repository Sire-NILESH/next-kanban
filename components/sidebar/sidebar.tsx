import React from "react";
import Brand from "../brand";
import SidebarItem from "./sidebar-item";

const Sidebar = () => {
  return (
    <div className="w-80 bg-default-50 p-4">
      <div className="mb-5">
        <Brand />
      </div>

      <div className="p-2 space-y-5">
        <SidebarItem />
        <SidebarItem />
        <SidebarItem />
      </div>
    </div>
  );
};

export default Sidebar;
