import mongoose from "mongoose";
// const DB_URI = process.env.DATABASE_URL!.replace(
//   "<PASSWORD>",
//   process.env.DATABASE_PASSWORD!
// );

const DB_URI = process.env.DATABASE_LOCAL!;

const dbConnect = async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log("DB connection successfully established");
  } catch (error) {
    console.log("DB connection failed 💥💥");
    console.log(error);
    throw error;
  }
};
// const dbConnect = async () => {
//   try {
//     await mongoose.connect(DB_URI, {
//       tls: true,
//       ssl: true,
//     });
//     console.log("DB connection successfully established");
//     return true;
//   } catch (error) {
//     console.log("DB connection successfully failed 💥💥");
//     console.log(error);
//     return false;
//   }
// };

export default dbConnect;
