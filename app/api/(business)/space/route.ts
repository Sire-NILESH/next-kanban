import AppError from "@/lib/appError";
import dbConnect from "@/lib/dbConnect";
import ErrorHandler, { ExtendedError } from "@/lib/errorHandler";
import Space from "@/models/spaceModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const doc = await Space.find().lean();

    if (!doc) throw new AppError("No Spaces found", 404);

    return NextResponse.json(
      {
        status: "success",
        results: doc.length,
        data: {
          data: doc,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    const err = ErrorHandler(error as ExtendedError, request);
    return NextResponse.json(err, {
      status: err?.statusCode ? err.statusCode : 500,
    });
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const reqBody = await request.json();
    const userId = request.nextUrl.searchParams.get("userId");

    const body = {
      name: reqBody.name,
      userId: userId,
      projects: reqBody.projects ? reqBody.projects : [],
    };

    const doc = await Space.create(body);

    return NextResponse.json(
      {
        status: "success",
        data: {
          data: doc,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    const err = ErrorHandler(error as ExtendedError, request);
    return NextResponse.json(err, {
      status: err?.statusCode ? err.statusCode : 500,
    });
  }
}
