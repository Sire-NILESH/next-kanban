import React from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { Chip } from "@nextui-org/chip";
import {
  Calendar,
  Flag,
  ListTodo,
  MessageSquare,
  MoveRight,
} from "lucide-react";
import { Progress } from "@nextui-org/progress";

const TaskCard = () => {
  return (
    // <div className="">
    <Card className="max-w-[400px]" shadow="none">
      <CardHeader className="flex flex-col gap-3 items-start">
        <div className="flex flex-wrap gap-2">
          <Chip color="secondary" variant="flat" size="sm">
            ASAP
          </Chip>
          {/* <Chip color="warning" variant="flat" size="sm">
            Development
          </Chip> */}
          <Chip color="success" variant="flat" size="sm">
            Design
          </Chip>
        </div>
      </CardHeader>

      {/* <Divider /> */}

      <CardBody className="flex flex-col gap-5 items-start px-3">
        {/* <Progress
          aria-label="Completed..."
          size="sm"
          value={64}
          color="secondary"
          showValueLabel={true}
          className=""
        /> */}

        <div className="space-y-1">
          {/* CARD TITLE */}
          <p className="line-clamp-1 font-semibold text-lg">
            This is a task todo.
          </p>
          {/* CARD TITLE */}
          <p className="line-clamp-2 text-sm text-default-500">
            Make beautiful websites regardless of your design experience.
          </p>
        </div>

        <div className="w-full flex justify-between">
          {/* <Chip
            radius="sm"
            variant="bordered"
            size="sm"
            className="border-1"
            startContent={<Calendar size={14} className="mr-1" />}
          >
            Oct 3, 2024
          </Chip>

          <MoveRight size={26} /> */}

          <Chip
            radius="sm"
            variant="bordered"
            size="sm"
            className="border-1"
            startContent={<Flag size={14} className="mr-1" />}
          >
            Nov 3, 2024
          </Chip>
        </div>
      </CardBody>

      {/* <Divider className="mt-2" /> */}

      <CardFooter className="space-x-5">
        <div className="flex items-center gap-2">
          <span className="text-default-600 text-sm">63%</span>
          <div className="w-32">
            <Progress
              aria-label="Completion"
              // label="Completion"
              size="sm"
              value={63}
              color="secondary"
              // showValueLabel={true}
            />
          </div>
        </div>

        {/* <Chip color="danger" variant="solid" size="sm">
          High Priority
        </Chip> */}

        <div className="flex items-center gap-1">
          <ListTodo size={18} className="text-default-700" />
          <span className="text-default-700 text-sm">5/8</span>
        </div>

        <div className="flex items-center gap-1">
          <MessageSquare size={18} className="text-default-700" />
          <span className="text-default-700 text-sm">6</span>
        </div>
      </CardFooter>
    </Card>
    // </div>
  );
};

export default TaskCard;
