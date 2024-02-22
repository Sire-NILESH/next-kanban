import AppError from "@/lib/appError";
import dbConnect from "@/lib/dbConnect";
import ErrorHandler, { ExtendedError } from "@/lib/errorHandler";
import Project from "@/models/projectModel";
import { NextRequest, NextResponse } from "next/server";

type Props = {
  params: {
    spaceId: string;
  };
};

export async function GET(
  request: NextRequest,
  { params: { spaceId } }: Props
) {
  try {
    await dbConnect();

    const userId = request.nextUrl.searchParams.get("userId");

    if (!userId) {
      throw new AppError("Missing User", 401);
    }

    const doc = await Project.find({ spaceId: spaceId, userId: userId }, [
      "_id",
      "name",
    ]).lean();

    if (!doc) {
      throw new AppError("No document found for that id", 404);
    }

    return NextResponse.json(
      { status: "success", data: { data: doc } },
      { status: 200 }
    );
  } catch (error) {
    const err = ErrorHandler(error as ExtendedError, request);
    return NextResponse.json(err, {
      status: err?.statusCode ? err.statusCode : 500,
    });
  }
}
