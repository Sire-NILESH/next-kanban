// import Error from "next/error";
import { MongooseError } from "mongoose";
import { NextRequest } from "next/server";
import AppError from "./appError";

export interface ExtendedError extends Error, MongooseError {
  statusCode?: number;
  code?: number;
  status?: string;
  path?: string;
  value?: string;
  isOperational?: boolean;
  errors?: any[];
  keyValue?: any;
}

const handleCastErrorDB = (err: ExtendedError) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  console.log(message);
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err: ExtendedError) => {
  //err.message: "E11000 duplicate key error collection: natours.tours index: name_1 dup key: { name: \"The Forest Hiker\" }"

  //const value = err.message.match(/(["'])(\\?.)*?\1/);   //regex to read anything betweeen "" from above.
  const value = err.keyValue.name;
  const message = ` Already in use duplicate field: ${value}.`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err: ExtendedError) => {
  if (err.errors) {
    const errors = Object.values(err.errors).map((el) => el.message);

    const message = `Invalid input data. ${errors.join(". ")}`;
    return new AppError(message, 400);
  }
  return new AppError("Invalid input data", 400);
};

const handleJWTError = () =>
  new AppError("Invalid token. Please log in again.", 401);

const handleJWTExpiredError = () =>
  new AppError("Your token has expired. Please log in again.", 401);

const sendErrorDev = (err: ExtendedError, req: NextRequest) => {
  // for API, only send JSON
  if (req.nextUrl.pathname.startsWith("/api")) {
    return {
      status: err.status,
      statusCode: err.statusCode,
      error: err,
      message: err.message,
      stack: err.stack,
    };
  }
};

const sendErrorProd = (err: ExtendedError, req: NextRequest) => {
  console.log(err);
  // A) Operational, trusted error: send message to client and
  if (err.isOperational) {
    console.log(err.isOperational);
    return {
      status: err.status,
      statusCode: err.statusCode,
      error: err,
      message: err.message,
    };
  }

  // B) Programming or other unknown errors: dont leak err details.
  // 1) Log error
  console.error("ERROR", err);

  // 2) Send generic message
  return {
    status: "fail",
    statusCode: 500,
    message: "Internal server error. Something went wrong",
  };
};

export default function ErrorHandler(err: ExtendedError, req: NextRequest) {
  err.statusCode = err.statusCode || 500; //500 is internal server error.
  err.status = err.status || "error";

  if (process.env.BACKEND_ENV === "development") {
    return sendErrorDev(err, req);
  } else if (process.env.BACKEND_ENV === "production") {
    let error = { ...err };
    error.message = err.message; //this field for some reason doest gets copied so had to do it manually.
    console.log("errorMsg: ", error);

    if (err.message.startsWith("Cast to ObjectId"))
      error = handleCastErrorDB(error);

    if (err.code === 11000) error = handleDuplicateFieldsDB(error);

    if (err.name === "ValidationError") error = handleValidationErrorDB(error);

    if (err.name === "JsonWebTokenError") error = handleJWTError();

    if (err.name === "TokenExpiredError") error = handleJWTExpiredError();

    return sendErrorProd(error, req);
  }
}
