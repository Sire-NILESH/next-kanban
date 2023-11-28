import mongoose, { Model } from "mongoose";
import slugify from "slugify";
import Task, { ITask } from "./taskModel";

export interface IProject {
  name: string;
  slug: string;
  userId: string;
  spaceId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

interface ISections {
  todo: ITask[];
  in_progress: ITask[];
  in_review: ITask[];
  done: ITask[];
}

// Put all static methods in this interface:
interface IProjectModel extends Model<IProject> {
  getSections: (id: mongoose.Types.ObjectId) => Promise<ISections>;
}

const projectSchema = new mongoose.Schema<IProject, IProjectModel>(
  {
    name: {
      type: String,
      required: [true, "A Project must have a name"],
      unique: true,
      trim: true,
      maxlength: [
        40,
        "A Project name must have less than or equal to 40 characters",
      ],
      minlength: [2, "A Project name must have more or equal to 2 characters"],
    },

    slug: String,

    userId: {
      type: String,
      required: [true, "Project must belong to a User."],
    },

    spaceId: {
      type: mongoose.Schema.ObjectId,
      required: [true, "Project must belong to a Space."],
    },
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
    timestamps: true,
  }
);

projectSchema.pre("find", function (next) {
  this.select("-__v");
  next();
});

projectSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

projectSchema.static(
  "getSections",
  async function getSections(id: mongoose.Types.ObjectId) {
    const sections = ["todo", "in_progress", "in_review", "done"];
    const results: ISections = {
      todo: [],
      in_progress: [],
      in_review: [],
      done: [],
    };

    for (const section of sections) {
      results[section as keyof ISections] = await Task.find({
        projectId: id,
        project_section: section,
      });
    }

    return results;
  }
);

const Project =
  (mongoose.models.Project as IProjectModel) ||
  mongoose.model<IProject, IProjectModel>("Project", projectSchema);

export default Project;
