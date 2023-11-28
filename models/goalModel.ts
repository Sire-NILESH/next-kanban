// import mongoose from "mongoose";

// interface Goal {
//   name: string;
//   created_by: string;
//   isChecked: boolean;
//   createdAt: Date;
//   updatedAt: Date;
// }

// const goalSchema = new mongoose.Schema<Goal>(
//   {
//     name: {
//       type: String,
//       required: [true, "A Goal must have a name"],
//       unique: true,
//       trim: true,
//       maxlength: [40, "A Goal name must have less or equal than 40 characters"],
//       minlength: [2, "A Goal name must have more or equal than 2 characters"],
//     },

//     created_by: {
//       type: String,
//       required: [true, "Goal must belong to a User."],
//     },

//     isChecked: {
//       type: Boolean,
//       default: false,
//     },
//   },

//   {
//     toObject: { virtuals: true },
//     toJSON: { virtuals: true },
//     timestamps: true,
//   }
// );

// goalSchema.pre("save", function (next) {
//   if (!this.isModified("password") || this.isNew) return next();

//   this.updatedAt = new Date(Date.now() - 1000); // -1sec to compensate the delay on updating DB and new Token generation.
//   next();
// });

// const Goal = mongoose.model<Goal>("Goal", goalSchema);

// export default Goal;
