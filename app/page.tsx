import NextLink from "next/link";
import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { button as buttonStyles } from "@nextui-org/theme";
import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { SheetSide } from "@/components/sheet-side";
import { DatePicker } from "@/components/date-picker";
import { Navbar } from "@/components/navbar";

export default function Home() {
  return (
    <>
      <Navbar />

      <section className="px-2 lg:px-6 flex flex-col mt-16 items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-2xl text-center justify-center">
          <h1 className={title()}>Flowing&nbsp; </h1>
          <h1 className={title({ color: "violet" })}>Tasks,&nbsp;</h1>
          <br />
          <h1 className={title()}>organized&nbsp;</h1>
          <h1 className={title({ color: "violet" })}>Boards&nbsp;</h1>
          <br />
          <h1 className={title()}>and elevated&nbsp;</h1>
          <br className="sm:hidden" />
          <h1 className={title({ color: "violet" })}>Productivity.</h1>

          <h2 className={subtitle({ class: "mt-4" })}>
            Ensuring efficient task management and clear progress visualization
            for enhanced productivity with
            <span className="text-secondary font-bold">&nbsp;Next Kanban</span>
          </h2>
        </div>

        <div className="flex gap-3">
          <Link
            isExternal
            as={NextLink}
            href={siteConfig.links.docs}
            className={buttonStyles({
              color: "primary",
              radius: "full",
              variant: "shadow",
            })}
          >
            Get started
          </Link>
          <Link
            // isExternal
            as={NextLink}
            className={buttonStyles({ variant: "bordered", radius: "full" })}
            // href={siteConfig.links.github}
            href={"/dashboard/space/565354gf4dsfg/project/45465xfgf76"}
          >
            Dashboard
          </Link>
        </div>

        <div className="mt-8">
          <Snippet hideSymbol hideCopyButton variant="flat">
            <span>
              Get started by editing <Code color="primary">app/page.tsx</Code>
            </span>
          </Snippet>
        </div>

        <SheetSide />

        <DatePicker />
      </section>
    </>
  );
}
