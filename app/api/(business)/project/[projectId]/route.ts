import AppError from "@/lib/appError";
import dbConnect from "@/lib/dbConnect";
import ErrorHandler, { ExtendedError } from "@/lib/errorHandler";
import Project from "@/models/projectModel";
import { NextRequest, NextResponse } from "next/server";

type Props = {
  params: {
    projectId: string;
  };
};

export async function GET(
  request: NextRequest,
  { params: { projectId } }: Props
) {
  try {
    await dbConnect();

    const fetchedProject = await Project.findById(projectId);

    if (!fetchedProject) {
      throw new AppError("No document found for that id", 404);
    }

    const projectSectionTasks = await Project.getSections(fetchedProject._id);

    return NextResponse.json(
      {
        status: "success",
        data: { data: { ...fetchedProject.toObject(), projectSectionTasks } },
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

export async function PUT(
  request: NextRequest,
  { params: { projectId } }: Props
) {
  try {
    await dbConnect();

    const userId = request.nextUrl.searchParams.get("userId");
    const reqBody = await request.json();

    if (reqBody.name === undefined || typeof reqBody.name !== typeof "") {
      throw new AppError(
        "Insufficient or incorrect parameter type for update",
        400
      );
    }

    const doc = await Project.findById(projectId);

    if (!doc) {
      throw new AppError("No document found for that id", 404);
    } else if (doc.userId !== userId) {
      throw new AppError("Insufficient permissions", 403);
    }

    // for now we only support changing the 'name' of the PROJECT for EDIT option.
    doc.name = reqBody.name as string;

    const updatedDoc = await doc.save();

    // const updateQuery = {
    //   $addToSet: {
    //     projects: {
    //       projectId: updatedDoc["_id"],
    //       projectName: updatedDoc.name,
    //     },
    //   },
    // };

    return NextResponse.json(
      {
        status: "success",
        data: {
          data: updatedDoc,
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

export async function DELETE(
  request: NextRequest,
  { params: { projectId } }: Props
) {
  try {
    await dbConnect();

    const userId = request.nextUrl.searchParams.get("userId");
    const spaceId = request.nextUrl.searchParams.get("spaceId");

    if (!spaceId)
      throw new AppError(
        "Insufficient info, missing Space ID to which this Project belongs",
        401
      );

    const doc = await Project.findById(projectId);

    if (!doc) {
      throw new AppError("No document found for that id", 404);
    } else if (doc.userId !== userId) {
      throw new AppError("Insufficient permissions", 403);
    }

    // 1) Delete project
    await Project.findByIdAndDelete(projectId);

    // const updateQuery = { $pull: { projects: projectId } };

    // //  2) Also add the project to the space to which it belongs.
    // await Space.findByIdAndUpdate(spaceId, updateQuery, {
    //   new: true,
    // });

    // NextResponse currently does not support 204(content deleted) status code hence using 200 here.
    return NextResponse.json(
      {
        status: "success",
        deleted: true,
        data: {
          data: null,
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
