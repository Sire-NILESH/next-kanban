// import mongoose from "mongoose";

// interface Container {
//   name: string;
//   slug: string;
//   createdAt: Date;
//   updatedAt: Date;
// }

// const containerSchema = new mongoose.Schema<Container>(
//   {
//     name: {
//       type: String,
//       required: [true, "A Container must have a name"],
//       trim: true,
//       enum: {
//         values: ["todo", "in_progress", "in_review", "done"],
//         message:
//           "Contianer name can only be: todo, in_progress, in_review, done",
//       },
//     },
//   },
//   {
//     toObject: { virtuals: true },
//     toJSON: { virtuals: true },
//     timestamps: true,
//   }
// );

// containerSchema.pre("save", function (next) {
//   if (!this.isModified("password") || this.isNew) return next();

//   this.updatedAt = new Date(Date.now() - 1000); // -1sec to compensate the delay on updating DB and new Token generation.
//   next();
// });

// const Container = mongoose.model<Container>("Container", containerSchema);

// export default Container;
