import {
  NavbarBrand,
  NavbarContent,
  Navbar as NextUINavbar,
} from "@nextui-org/navbar";

import { ThemeSwitch } from "@/components/theme-switch";
import Brand from "@/components/brand";

export const AuthNavbar = () => {
  return (
    <NextUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <Brand />
        </NavbarBrand>

        <NavbarContent className="basis-1 pl-4" justify="end">
          <ThemeSwitch />
        </NavbarContent>
      </NavbarContent>
    </NextUINavbar>
  );
};
