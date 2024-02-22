import React from "react";
import TaskColumnHeader from "./task-column-header";
import TaskCard from "./task-card";

type Props = {
  name: string;
};

const TaskColumn = ({ name }: Props) => {
  return (
    <div className="max-w-xs space-y-6">
      <TaskColumnHeader name={name} />
      <TaskCard />
      <TaskCard />
      <TaskCard />
      <TaskCard />
    </div>
  );
};

export default TaskColumn;
