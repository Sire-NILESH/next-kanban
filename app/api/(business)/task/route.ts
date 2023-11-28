import AppError from "@/lib/AppError";
import dbConnect from "@/lib/dbConnect";
import ErrorHandler, { ExtendedError } from "@/lib/errorHandler";
import Task from "@/models/taskModel";
import { NextRequest, NextResponse } from "next/server";

// type Section = "todo" | "in_progress" | "in_review" | "done";

const allowedSection = new Set(["todo", "in_progress", "in_review", "done"]);

export async function GET(request: NextRequest) {
  try {
    const userId = request.nextUrl.searchParams.get("userId");
    const projectId = request.nextUrl.searchParams.get("projectId");
    const section = request.nextUrl.searchParams.get("section");

    if (!userId) throw new AppError("No access", 401);
    else if (!projectId) throw new AppError("Missing projectId parameter", 400);
    else if (section !== null && !allowedSection.has(section)) {
      throw new AppError(
        "A Task belongs to a section : 'todo', 'in_progress', 'in_review', 'done'",
        400
      );
    }

    await dbConnect();

    const doc =
      section === null
        ? await Task.find()
        : await Task.find({ projectId, project_section: section });

    if (!doc) throw new AppError("No Tasks found", 404);

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
    const reqBody = await request.json();
    const userId = request.nextUrl.searchParams.get("userId");
    const section = request.nextUrl.searchParams.get("section");

    if (!reqBody.projectId)
      throw new AppError("A Task must belong to a Project", 400);
    else if (!section || !allowedSection.has(section)) {
      throw new AppError(
        "A Task must belong to a section : 'todo', 'in_progress', 'in_review', 'done'",
        400
      );
    }

    await dbConnect();

    const body = {
      name: reqBody.name,
      userId: userId,
      projectId: reqBody.projectId ? reqBody.projectId : undefined,
      project_section: section,
      tags: reqBody.tags ? reqBody.tags : [],
      description: reqBody.description ? reqBody.description : [],
      priority: reqBody.priority ? reqBody.priority : "low",
      deadline: reqBody.deadline ? reqBody.deadline : undefined,
      goals: reqBody.goals,
      remarks: reqBody.remarks ? reqBody.remarks : [],
    };

    // 1) Create the task
    const createdTask = await Task.create(body);

    //  const updateQuery = {
    //    $addToSet: { sections: { [section as string]: createdTask["_id"] } },
    //  };

    // 2) Also add the task to the project to which it belongs.
    //  await Project.findByIdAndUpdate(reqBody.projectId, updateQuery, {
    //    new: true,
    //  });
    // const project = await Project.findById(reqBody.projectId);

    // await project.sections[section as string].push(createdTask["_id"]);

    return NextResponse.json(
      {
        status: "success",
        data: {
          data: createdTask,
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
