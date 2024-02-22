"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
// import { Button } from "@nextui-org/button";
import { ShadCnBtn } from "./ui/button";
import MarkdownEditor from "./markdown-editor";

const SHEET_SIDES = ["top", "bottom", "left", "right"] as const;

type SheetSide = (typeof SHEET_SIDES)[number];

export function SheetSide() {
  return (
    <div className="w-full max-w-xl">
      <div className="grid grid-cols-2 gap-2">
        {SHEET_SIDES.map((side) => (
          <Sheet key={side}>
            <SheetTrigger asChild>
              {/* <Button variant="ghost">{side}</Button> */}
              <ShadCnBtn variant="outline">{side}</ShadCnBtn>
            </SheetTrigger>
            <SheetContent side={side}>
              <SheetHeader>
                <SheetTitle>Edit profile</SheetTitle>
                <SheetDescription>
                  {
                    "Make changes to your profile here. Click save when you're done."
                  }
                </SheetDescription>
              </SheetHeader>
              <div className="grid gap-4 py-4">
                <form className="mt-6">
                  <MarkdownEditor />
                </form>
              </div>
              <SheetFooter>
                <SheetClose asChild>
                  <ShadCnBtn type="submit">Save changes</ShadCnBtn>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        ))}
      </div>
    </div>
  );
}
