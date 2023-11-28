import mongoose, { Model, Schema } from "mongoose";

interface Remark {
  message: string;
  createdAt: Date;
}

interface Goal {
  name: string;
  isChecked: boolean;
}

interface Tag {
  name: string;
  colorScheme: "default" | "blue" | "purple" | "green" | "yellow" | "red";
}

export interface ITask {
  name: string;
  userId: string;
  description: string[];
  priority: "low" | "medium" | "high";
  tags: Tag[];
  projectId: mongoose.Types.ObjectId;
  project_section: "todo" | "in_progress" | "in_review" | "done";
  deadline: Date;
  goals: Goal[];
  remarks: Remark[];
  createdAt: Date;
  updatedAt: Date;
}

interface ITaskVirtuals {
  overviewStats: {
    totalRemarks: number;
    totalGoals: number;
    totalCompletedGoals: number;
  };
}

type ITaskModel = Model<ITask, {}, ITaskVirtuals>;

const GoalSchema = new Schema({
  name: {
    type: String,
    required: [true, "A Goal must have a name"],
    unique: true,
    sparse: true,
    trim: true,
    maxlength: [40, "A Goal name must have less or equal than 40 characters"],
    minlength: [2, "A Goal name must have more or equal than 2 characters"],
  },
  isChecked: { type: Boolean, default: false },
});

const TagSchema = new Schema({
  name: {
    type: String,
    required: [true, "A Goal must have a name"],
    sparse: true,
    trim: true,
    maxlength: [20, "A Task Tag must have less or equal than 20 characters"],
    minlength: [2, "A Task Tag must have more or equal than 2 characters"],
  },
  colorScheme: {
    type: String,
    default: "default",
    enum: {
      values: ["default", "blue", "purple", "green", "yellow", "red"],
      message:
        "Priority color scheme can only be: default, blue, purple, green, yellow , red",
    },
  },
});

const taskSchema = new mongoose.Schema<ITask, ITaskModel, ITaskVirtuals>(
  {
    name: {
      type: String,
      required: [true, "A task must have a name"],
      unique: true,
      trim: true,
      maxlength: [40, "A Task name must have less or equal than 40 characters"],
      minlength: [2, "A Task name must have more or equal than 2 characters"],
    },

    userId: {
      type: String,
      required: [true, "Task must belong to a User."],
    },

    description: {
      type: [String],
      trim: true,
      maxlength: [
        40,
        "A Task Description must have less or equal than 100 characters",
      ],
      minlength: [
        2,
        "A Task Description must have more or equal than 2 characters",
      ],
    },

    tags: { type: [TagSchema], default: [] },

    priority: {
      type: String,
      required: [true, "A Task must have a priority"],
      enum: {
        values: ["low", "medium", "high"],
        message: "priority can only be: low, medium, high",
      },
    },

    projectId: {
      type: mongoose.Schema.ObjectId,
      ref: "Project",
      required: [true, "Task must belong to a project."],
    },

    project_section: {
      type: String,
      default: "todo",
      enum: {
        values: ["todo", "in_progress", "in_review", "done"],
        message:
          "A Task must belong to a section : 'todo', 'in_progress', 'in_review', 'done'",
      },
    },

    goals: { type: [GoalSchema], default: [] },

    remarks: [
      {
        message: String,
        createdAt: String,
      },
    ],

    deadline: Date,
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
    timestamps: true,
  }
);

taskSchema.virtual("overviewStats").get(function () {
  return {
    totalRemarks: this.get("remarks").length,
    totalGoals: this.get("goals").length,
    totalCompletedGoals: this.get("goals")?.filter((g) => g.isChecked).length,
  };
});

const Task =
  (mongoose.models.Task as ITaskModel) ||
  mongoose.model<ITask, ITaskModel>("Task", taskSchema);

export default Task;
