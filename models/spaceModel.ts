import mongoose, { Model } from "mongoose";
import slugify from "slugify";

export interface ISpace {
  name: string;
  userId: string;
  slug: string;
}

type ISpaceModel = Model<ISpace>;

const spaceSchema = new mongoose.Schema<ISpace, ISpaceModel>(
  {
    name: {
      type: String,
      required: [true, "A space must have a name"],
      unique: true,
      trim: true,
      maxlength: [
        40,
        "A space name must have less or equal than 40 characters",
      ],
      minlength: [2, "A space name must have more or equal than 2 characters"],
    },

    slug: String,

    userId: {
      type: String,
      required: [true, "Space must belong to a User."],
    },
  },

  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
    timestamps: true,
  }
);

spaceSchema.pre("find", function (next) {
  // this.select("-_id -__v");
  this.select("-__v");
  next();
});

spaceSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

const Space =
  (mongoose.models.Space as ISpaceModel) ||
  mongoose.model<ISpace, ISpaceModel>("Space", spaceSchema);

export default Space;
