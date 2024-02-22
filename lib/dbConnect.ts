import mongoose from "mongoose";
// const DB_URI = process.env.DATABASE_URL!.replace(
//   "<PASSWORD>",
//   process.env.DATABASE_PASSWORD!
// );

const DB_URI = process.env.DATABASE_LOCAL!;
const connectionStatus = { isConnected: false };

const dbConnect = async () => {
  try {
    console.log(connectionStatus.isConnected);

    if (connectionStatus.isConnected) return;

    const db = await mongoose.connect(DB_URI);
    console.log("db");
    console.log(db.connections[0].readyState === 1);
    connectionStatus.isConnected = db.connections[0].readyState === 1;
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

// import mongoose from "mongoose";

// const connection = {};

// export const connectToDB = async () => {
//   try {
//     if (connection.isConnected) return;
//     const db = await mongoose.connect(process.env.MONGO);
//     connection.isConnected = db.connections[0].readyState;
//   } catch (error) {
//     console.log(error)
//     throw new Error(error);
//   }
// };

export default dbConnect;
