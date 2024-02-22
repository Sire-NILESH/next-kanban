import { ShadCnBtn } from "@/components/ui/button";
import { Chip } from "@nextui-org/chip";
import { Plus } from "lucide-react";

type TaskColumnHeaderProps = {
  name: string;
};

const TaskColumnHeader = ({ name }: TaskColumnHeaderProps) => {
  return (
    <header className="space-y-3">
      <div className="flex items-center space-x-4">
        <h3 className="font-semibold tracking-wide text-default-700">{name}</h3>
        <Chip color="secondary">5</Chip>
      </div>

      <ShadCnBtn className="w-full" variant={"outline_primary"}>
        <Plus size={18} className="mr-2" />
        Add new Task
      </ShadCnBtn>
    </header>
  );
};

export default TaskColumnHeader;
