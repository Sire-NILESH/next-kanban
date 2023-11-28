// import mongoose, { Query } from "mongoose";

// interface Remark {
//   remark: string;
//   userId: string;
//   task: mongoose.Types.ObjectId;
//   createdAt: Date;
//   updatedAt: Date;
// }

// const remarkSchema = new mongoose.Schema<Remark>(
//   {
//     remark: {
//       type: "String",
//       required: [true, "Remark cannot be empty"],
//     },

//     userId: {
//       type: String,
//       required: [true, "Task must belong to a User."],
//     },

//     task: {
//       type: mongoose.Schema.ObjectId,
//       ref: "Task",
//       required: [true, "Remark must belong to a Task."],
//     },
//   },
//   {
//     toObject: { virtuals: true },
//     toJSON: { virtuals: true },
//     timestamps: true,
//   }
// );

// remarkSchema.pre("save", function (next) {
//   if (!this.isModified("password") || this.isNew) return next();

//   this.updatedAt = new Date(Date.now() - 1000); // -1sec to compensate the delay on updating DB and new Token generation.
//   next();
// });

// // remarkSchema.pre<Remark>(/^find/, async function (next) {
// //   this.model.find({ isDeleted: { $e: false } });
// //   //'.this' will point to current query

// //   this.find({ isDeleted: { $e: false } }); //will first fetch all the non-deleted before any find query.
// //   next();
// // });

// const Remark = mongoose.model<Remark>("Remark", remarkSchema);

// export default Remark;
