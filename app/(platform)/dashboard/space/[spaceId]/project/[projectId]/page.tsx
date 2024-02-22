"use client";
import ProjectBody from "@/app/(platform)/components/project-body";
// remove use client later

import ProjectPageHeader from "@/app/(platform)/components/project-page-header";

import MarkdownEditor from "@/components/markdown-editor";

type Props = {
  params: {
    spaceId: string;
    projectId: string;
  };
};

const DashboardProjectPage = ({ params: { spaceId, projectId } }: Props) => {
  return (
    <div className="w-full h-full">
      <ProjectPageHeader />

      <MarkdownEditor />
      {/* <ProjectBody /> */}
    </div>
  );
};

export default DashboardProjectPage;
