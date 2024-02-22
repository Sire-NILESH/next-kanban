import AppError from "@/lib/appError";
import dbConnect from "@/lib/dbConnect";
import ErrorHandler, { ExtendedError } from "@/lib/errorHandler";
import Project from "@/models/projectModel";
import Space from "@/models/spaceModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const spaceId = request.nextUrl.searchParams.get("spaceId");
    const compact = request.nextUrl.searchParams.get("compact");

    const doc =
      compact === "true"
        ? await Project.find({ spaceId }, ["_id", "name"])
        : await Project.find({ spaceId });

    if (!doc) throw new AppError("No Projects found", 404);

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
    const spaceId = request.nextUrl.searchParams.get("spaceId");

    const body = {
      name: reqBody.name,
      userId: userId,
      spaceId: spaceId,
    };

    // 1) Create the project
    const createdProject = await Project.create(body);

    // const updateQuery = {
    //   $addToSet: {
    //     projects: {
    //       projectId: createdProject["_id"],
    //       projectName: createdProject.name,
    //     },
    //   },
    // };

    // const updateQuery = { $addToSet: { projects: createdProject["_id"] } };

    // // 2) Also add the project to the space to which it belongs.
    // await Space.findByIdAndUpdate(reqBody.spaceId, updateQuery, {
    //   new: true,
    // });

    return NextResponse.json(
      {
        status: "success",
        data: {
          data: createdProject,
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
