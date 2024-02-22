import React from "react";
import NextLink from "next/link";
import { Logo } from "./icons";
import { siteConfig } from "@/config/site";

const Brand = () => {
  return (
    <NextLink className="flex justify-start items-center gap-1" href="/">
      <Logo />
      <p className="uppercase font-bold text-inherit">{siteConfig.name}</p>
    </NextLink>
  );
};

export default Brand;
