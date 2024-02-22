import React from "react";
import TaskColumn from "./task-column";

const ProjectBody = () => {
  return (
    <main className="mt-8 h-full w-full px-4 grid grid-cols-4 place-content-between overflow-auto pb-28">
      <TaskColumn name="Todo" />
      <TaskColumn name="In Progress" />
      <TaskColumn name="In Review" />
      <TaskColumn name="Done" />
    </main>
  );
};

export default ProjectBody;
