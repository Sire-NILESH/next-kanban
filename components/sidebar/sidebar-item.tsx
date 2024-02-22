import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { typography } from "../primitives";

const SidebarItem = () => {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>Wrokspace</AccordionTrigger>
        <AccordionContent className="py-2 space-y-2">
          <p className="px-4 text-default-800">Project Mumbai</p>
          <p className="px-4 text-default-500">Project Moscow</p>
          <p className="px-4 text-default-500">Project Taipei</p>
          <p className="px-4 text-default-500">Project Manhattan</p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default SidebarItem;
