import AppError from "@/lib/appError";
import dbConnect from "@/lib/dbConnect";
import ErrorHandler, { ExtendedError } from "@/lib/errorHandler";
import { filterObj } from "@/lib/utils";
import Task, { ITask } from "@/models/taskModel";
import { NextRequest, NextResponse } from "next/server";

type Props = {
  params: {
    taskId: string;
  };
};

export async function GET(request: NextRequest, { params: { taskId } }: Props) {
  try {
    await dbConnect();

    const doc = await Task.findById(taskId);

    if (!doc) {
      throw new AppError("No document found for that id", 404);
    }

    return NextResponse.json(
      {
        status: "success",
        data: { data: doc },
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

export async function PUT(request: NextRequest, { params: { taskId } }: Props) {
  try {
    const userId = request.nextUrl.searchParams.get("userId");
    const reqBody: Partial<ITask> = await request.json();

    const filteredUpdate = filterObj<ITask>(reqBody, "include", [
      "name",
      "deadline",
      "priority",
      "description",
      "tags",
      "project_section",
      "deadline",
      "goals",
      "remarks",
    ]);

    await dbConnect();

    const fetchedTask = await Task.findById(taskId);

    if (!fetchedTask) {
      throw new AppError("No document found for that id", 404);
    } else if (fetchedTask.userId !== userId)
      throw new AppError("Access not available", 401);

    const updateTask = await Task.findByIdAndUpdate(
      fetchedTask.id,
      filteredUpdate,
      { new: true, runValidators: true }
    );

    return NextResponse.json(
      {
        status: "success",
        data: { data: updateTask },
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
